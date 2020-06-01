package com.bh.daq.repository;

import com.bh.daq.domain.PropertyConfigModbus;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the PropertyConfigModbus entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PropertyConfigModbusRepository extends JpaRepository<PropertyConfigModbus, Long> {
}
