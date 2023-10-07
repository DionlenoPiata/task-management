package com.example.backend.models;

import com.example.backend.enums.TaskStatus;
import jakarta.persistence.*;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name = "TASKS")
public class TaskModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String name;
    private TaskStatus status;
    private Date dateStart;
    private Date dateEnd;
    private UUID userID;
}
