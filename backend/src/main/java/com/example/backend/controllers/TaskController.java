package com.example.backend.controllers;

import com.example.backend.dtos.TaskDto;
import com.example.backend.enums.TaskStatus;
import com.example.backend.models.TaskModel;
import com.example.backend.models.UserModel;
import com.example.backend.repositories.TaskRepository;
import javax.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("tasks")
public class TaskController {

    @Autowired
    TaskRepository taskRepository;

    @PostMapping
    public ResponseEntity<TaskModel> create(@RequestBody @Valid TaskDto taskDto) {
        TaskModel task = new TaskModel();
        BeanUtils.copyProperties(taskDto, task);
        return ResponseEntity.status(HttpStatus.CREATED).body(taskRepository.save(task));
    }

    @GetMapping
    public ResponseEntity<List<TaskModel>> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(taskRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getById(@PathVariable(value = "id") UUID id) {
        Optional<TaskModel> taskO = taskRepository.findById(id);
        return taskO.<ResponseEntity<Object>>map(task -> ResponseEntity.status(HttpStatus.OK).body(task)).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found."));
    }
    @GetMapping("/search/startDateAndEndDate")
    public ResponseEntity<List<TaskModel>> findStartDateAndEndDate(@RequestParam(required = false) String startDate, @RequestParam(required = false) String endDate) throws ParseException {
        return ResponseEntity.status(HttpStatus.OK).body(taskRepository.findAllByStartDateAndEndDate(new SimpleDateFormat("yyyy-MM-dd").parse(startDate), new SimpleDateFormat("yyyy-MM-dd").parse(endDate)));
    }

    @GetMapping("/search/allLate")
    public ResponseEntity<List<TaskModel>> findAllLate() {
        return ResponseEntity.status(HttpStatus.OK).body(taskRepository.findAllLate());
    }

    @GetMapping("/search/byUserAndStatus")
    public ResponseEntity<List<TaskModel>> findByUserAndStatus(@RequestParam(required = false) UUID userId, @RequestParam(required = false) TaskStatus status)  {
        return ResponseEntity.status(HttpStatus.OK).body(taskRepository.findAllByUserAndStatus( userId, status));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable(value = "id") UUID id, @RequestBody @Valid TaskDto taskDto) {
        Optional<TaskModel> taskO = taskRepository.findById(id);
        if (!taskO.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found.");
        }
        TaskModel task = taskO.get();
        BeanUtils.copyProperties(taskDto, task);
        return ResponseEntity.status(HttpStatus.OK).body(taskRepository.save(task));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable(value = "id") UUID id) {
        Optional<TaskModel> taskO = taskRepository.findById(id);
        if (!taskO.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found.");
        }
        taskRepository.delete(taskO.get());
        return ResponseEntity.status(HttpStatus.OK).body("Task deleted successfully.");
    }


}
