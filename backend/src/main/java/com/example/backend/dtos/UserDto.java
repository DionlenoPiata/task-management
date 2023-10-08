package com.example.backend.dtos;

import javax.validation.constraints.NotBlank;

public class UserDto {
    @NotBlank
    private String name;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
