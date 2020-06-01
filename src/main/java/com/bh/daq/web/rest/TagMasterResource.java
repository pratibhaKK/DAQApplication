package com.bh.daq.web.rest;

import com.bh.daq.domain.TagMaster;
import com.bh.daq.repository.TagMasterRepository;
import com.bh.daq.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.bh.daq.domain.TagMaster}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class TagMasterResource {

    private final Logger log = LoggerFactory.getLogger(TagMasterResource.class);

    private static final String ENTITY_NAME = "tagMaster";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TagMasterRepository tagMasterRepository;

    public TagMasterResource(TagMasterRepository tagMasterRepository) {
        this.tagMasterRepository = tagMasterRepository;
    }

    /**
     * {@code POST  /tag-masters} : Create a new tagMaster.
     *
     * @param tagMaster the tagMaster to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tagMaster, or with status {@code 400 (Bad Request)} if the tagMaster has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tag-masters")
    public ResponseEntity<TagMaster> createTagMaster(@RequestBody TagMaster tagMaster) throws URISyntaxException {
        log.debug("REST request to save TagMaster : {}", tagMaster);
        if (tagMaster.getId() != null) {
            throw new BadRequestAlertException("A new tagMaster cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TagMaster result = tagMasterRepository.save(tagMaster);
        return ResponseEntity.created(new URI("/api/tag-masters/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tag-masters} : Updates an existing tagMaster.
     *
     * @param tagMaster the tagMaster to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tagMaster,
     * or with status {@code 400 (Bad Request)} if the tagMaster is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tagMaster couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tag-masters")
    public ResponseEntity<TagMaster> updateTagMaster(@RequestBody TagMaster tagMaster) throws URISyntaxException {
        log.debug("REST request to update TagMaster : {}", tagMaster);
        if (tagMaster.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TagMaster result = tagMasterRepository.save(tagMaster);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tagMaster.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tag-masters} : get all the tagMasters.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tagMasters in body.
     */
    @GetMapping("/tag-masters")
    public List<TagMaster> getAllTagMasters() {
        log.debug("REST request to get all TagMasters");
        return tagMasterRepository.findAll();
    }

    /**
     * {@code GET  /tag-masters/:id} : get the "id" tagMaster.
     *
     * @param id the id of the tagMaster to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tagMaster, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tag-masters/{id}")
    public ResponseEntity<TagMaster> getTagMaster(@PathVariable Long id) {
        log.debug("REST request to get TagMaster : {}", id);
        Optional<TagMaster> tagMaster = tagMasterRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tagMaster);
    }

    /**
     * {@code DELETE  /tag-masters/:id} : delete the "id" tagMaster.
     *
     * @param id the id of the tagMaster to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tag-masters/{id}")
    public ResponseEntity<Void> deleteTagMaster(@PathVariable Long id) {
        log.debug("REST request to delete TagMaster : {}", id);

        tagMasterRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
