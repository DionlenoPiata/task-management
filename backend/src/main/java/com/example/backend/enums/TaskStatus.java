package com.example.backend.enums;

public enum TaskStatus {

    WAITING("waiting"), STARTED("started"), CLOSED("closed");
    private final String status;

    TaskStatus(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
