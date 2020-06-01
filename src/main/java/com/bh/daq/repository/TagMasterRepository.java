package com.bh.daq.repository;

import com.bh.daq.domain.TagMaster;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the TagMaster entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TagMasterRepository extends JpaRepository<TagMaster, Long> {
}
