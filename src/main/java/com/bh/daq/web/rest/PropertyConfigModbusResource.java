package com.bh.daq.web.rest;

import com.bh.daq.domain.PropertyConfigModbus;
import com.bh.daq.repository.PropertyConfigModbusRepository;
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
 * REST controller for managing {@link com.bh.daq.domain.PropertyConfigModbus}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class PropertyConfigModbusResource {

    private final Logger log = LoggerFactory.getLogger(PropertyConfigModbusResource.class);

    private static final String ENTITY_NAME = "propertyConfigModbus";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PropertyConfigModbusRepository propertyConfigModbusRepository;

    public PropertyConfigModbusResource(PropertyConfigModbusRepository propertyConfigModbusRepository) {
        this.propertyConfigModbusRepository = propertyConfigModbusRepository;
    }

    /**
     * {@code POST  /property-config-modbuses} : Create a new propertyConfigModbus.
     *
     * @param propertyConfigModbus the propertyConfigModbus to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new propertyConfigModbus, or with status {@code 400 (Bad Request)} if the propertyConfigModbus has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/property-config-modbuses")
    public ResponseEntity<PropertyConfigModbus> createPropertyConfigModbus(@RequestBody PropertyConfigModbus propertyConfigModbus) throws URISyntaxException {
        log.debug("REST request to save PropertyConfigModbus : {}", propertyConfigModbus);
        if (propertyConfigModbus.getId() != null) {
            throw new BadRequestAlertException("A new propertyConfigModbus cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PropertyConfigModbus result = propertyConfigModbusRepository.save(propertyConfigModbus);
        return ResponseEntity.created(new URI("/api/property-config-modbuses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /property-config-modbuses} : Updates an existing propertyConfigModbus.
     *
     * @param propertyConfigModbus the propertyConfigModbus to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated propertyConfigModbus,
     * or with status {@code 400 (Bad Request)} if the propertyConfigModbus is not valid,
     * or with status {@code 500 (Internal Server Error)} if the propertyConfigModbus couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/property-config-modbuses")
    public ResponseEntity<PropertyConfigModbus> updatePropertyConfigModbus(@RequestBody PropertyConfigModbus propertyConfigModbus) throws URISyntaxException {
        log.debug("REST request to update PropertyConfigModbus : {}", propertyConfigModbus);
        if (propertyConfigModbus.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PropertyConfigModbus result = propertyConfigModbusRepository.save(propertyConfigModbus);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, propertyConfigModbus.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /property-config-modbuses} : get all the propertyConfigModbuses.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of propertyConfigModbuses in body.
     */
    @GetMapping("/property-config-modbuses")
    public List<PropertyConfigModbus> getAllPropertyConfigModbuses() {
        log.debug("REST request to get all PropertyConfigModbuses");
        return propertyConfigModbusRepository.findAll();
    }

    /**
     * {@code GET  /property-config-modbuses/:id} : get the "id" propertyConfigModbus.
     *
     * @param id the id of the propertyConfigModbus to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the propertyConfigModbus, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/property-config-modbuses/{id}")
    public ResponseEntity<PropertyConfigModbus> getPropertyConfigModbus(@PathVariable Long id) {
        log.debug("REST request to get PropertyConfigModbus : {}", id);
        Optional<PropertyConfigModbus> propertyConfigModbus = propertyConfigModbusRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(propertyConfigModbus);
    }

    /**
     * {@code DELETE  /property-config-modbuses/:id} : delete the "id" propertyConfigModbus.
     *
     * @param id the id of the propertyConfigModbus to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/property-config-modbuses/{id}")
    public ResponseEntity<Void> deletePropertyConfigModbus(@PathVariable Long id) {
        log.debug("REST request to delete PropertyConfigModbus : {}", id);

        propertyConfigModbusRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
