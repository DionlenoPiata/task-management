package com.example.backend.controllers;

import com.example.backend.dtos.UserDto;
import com.example.backend.models.UserModel;
import com.example.backend.repositories.UserRepository;
import javax.validation.Valid;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("users")
public class UserController {

    @Autowired
    UserRepository userRepository;

    @PostMapping
    public ResponseEntity<UserModel> create(@RequestBody @Valid UserDto userDto) {
        UserModel user = new UserModel();
        BeanUtils.copyProperties(userDto, user);
        return ResponseEntity.status(HttpStatus.CREATED).body(userRepository.save(user));
    }

    @GetMapping
    public ResponseEntity<List<UserModel>> getAll() {
        return ResponseEntity.status(HttpStatus.OK).body(userRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getById(@PathVariable(value = "id") UUID id) {
        Optional<UserModel> userO = userRepository.findById(id);
        return userO.<ResponseEntity<Object>>map(user -> ResponseEntity.status(HttpStatus.OK).body(user)).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found."));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable(value="id") UUID id,
                                                @RequestBody @Valid UserDto userDto) {
        Optional<UserModel> userO = userRepository.findById(id);
        if(!userO.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
        UserModel user = userO.get();
        BeanUtils.copyProperties(userDto, user);
        return ResponseEntity.status(HttpStatus.OK).body(userRepository.save(user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable(value="id") UUID id) {
        Optional<UserModel> userO = userRepository.findById(id);
        if(!userO.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found.");
        }
        userRepository.delete(userO.get());
        return ResponseEntity.status(HttpStatus.OK).body("User deleted successfully.");
    }
}
