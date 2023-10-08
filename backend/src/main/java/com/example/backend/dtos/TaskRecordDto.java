package com.example.backend.dtos;

import com.example.backend.enums.TaskStatus;
import jakarta.validation.constraints.NotBlank;

import java.util.Date;
import java.util.UUID;

public record TaskRecordDto(@NotBlank String name, TaskStatus status, Date startDate, Date endDate,
                            UUID userId, UUID taskId) {
}
