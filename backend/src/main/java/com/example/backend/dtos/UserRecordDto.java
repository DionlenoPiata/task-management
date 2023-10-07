package com.example.backend.dtos;

import jakarta.validation.constraints.NotBlank;

public record UserRecordDto(@NotBlank String name) {
}
