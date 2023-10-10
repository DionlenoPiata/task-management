package com.example.backend.repositories;

import com.example.backend.enums.TaskStatus;
import com.example.backend.models.TaskModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface TaskRepository  extends JpaRepository<TaskModel, UUID> {

    @Query("select t from TaskModel t where t.startDate >= :startDate and t.endDate <= :endDate")
    List<TaskModel> findAllByStartDateAndEndDate(Date startDate, Date endDate);

     @Query("select t from TaskModel t where t.userId = :userId and (t.status = :status OR :status IS NULL)")
    List<TaskModel> findAllByUserAndStatus(UUID userId, TaskStatus status);

    @Query("select t from TaskModel t where t.endDate < CURRENT_TIMESTAMP and (t.status <> 2 OR t.status IS NULL)")
    List<TaskModel> findAllLate();
}
