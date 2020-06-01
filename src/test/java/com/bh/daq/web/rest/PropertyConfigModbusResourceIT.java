package com.bh.daq.web.rest;

import com.bh.daq.DaqApplicationApp;
import com.bh.daq.domain.PropertyConfigModbus;
import com.bh.daq.repository.PropertyConfigModbusRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PropertyConfigModbusResource} REST controller.
 */
@SpringBootTest(classes = DaqApplicationApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class PropertyConfigModbusResourceIT {

    private static final String DEFAULT_UOM = "AAAAAAAAAA";
    private static final String UPDATED_UOM = "BBBBBBBBBB";

    private static final Boolean DEFAULT_CONTROLLED_TAG = false;
    private static final Boolean UPDATED_CONTROLLED_TAG = true;

    private static final Long DEFAULT_REGISTER = 1L;
    private static final Long UPDATED_REGISTER = 2L;

    private static final Long DEFAULT_SLAVE_ID = 1L;
    private static final Long UPDATED_SLAVE_ID = 2L;

    private static final Long DEFAULT_COUNT = 1L;
    private static final Long UPDATED_COUNT = 2L;

    private static final String DEFAULT_MASK = "AAAAAAAAAA";
    private static final String UPDATED_MASK = "BBBBBBBBBB";

    private static final Long DEFAULT_POLL_INTERVAL = 1L;
    private static final Long UPDATED_POLL_INTERVAL = 2L;

    @Autowired
    private PropertyConfigModbusRepository propertyConfigModbusRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restPropertyConfigModbusMockMvc;

    private PropertyConfigModbus propertyConfigModbus;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PropertyConfigModbus createEntity(EntityManager em) {
        PropertyConfigModbus propertyConfigModbus = new PropertyConfigModbus()
            .uom(DEFAULT_UOM)
            .controlledTag(DEFAULT_CONTROLLED_TAG)
            .register(DEFAULT_REGISTER)
            .slaveId(DEFAULT_SLAVE_ID)
            .count(DEFAULT_COUNT)
            .mask(DEFAULT_MASK)
            .pollInterval(DEFAULT_POLL_INTERVAL);
        return propertyConfigModbus;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PropertyConfigModbus createUpdatedEntity(EntityManager em) {
        PropertyConfigModbus propertyConfigModbus = new PropertyConfigModbus()
            .uom(UPDATED_UOM)
            .controlledTag(UPDATED_CONTROLLED_TAG)
            .register(UPDATED_REGISTER)
            .slaveId(UPDATED_SLAVE_ID)
            .count(UPDATED_COUNT)
            .mask(UPDATED_MASK)
            .pollInterval(UPDATED_POLL_INTERVAL);
        return propertyConfigModbus;
    }

    @BeforeEach
    public void initTest() {
        propertyConfigModbus = createEntity(em);
    }

    @Test
    @Transactional
    public void createPropertyConfigModbus() throws Exception {
        int databaseSizeBeforeCreate = propertyConfigModbusRepository.findAll().size();
        // Create the PropertyConfigModbus
        restPropertyConfigModbusMockMvc.perform(post("/api/property-config-modbuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(propertyConfigModbus)))
            .andExpect(status().isCreated());

        // Validate the PropertyConfigModbus in the database
        List<PropertyConfigModbus> propertyConfigModbusList = propertyConfigModbusRepository.findAll();
        assertThat(propertyConfigModbusList).hasSize(databaseSizeBeforeCreate + 1);
        PropertyConfigModbus testPropertyConfigModbus = propertyConfigModbusList.get(propertyConfigModbusList.size() - 1);
        assertThat(testPropertyConfigModbus.getUom()).isEqualTo(DEFAULT_UOM);
        assertThat(testPropertyConfigModbus.isControlledTag()).isEqualTo(DEFAULT_CONTROLLED_TAG);
        assertThat(testPropertyConfigModbus.getRegister()).isEqualTo(DEFAULT_REGISTER);
        assertThat(testPropertyConfigModbus.getSlaveId()).isEqualTo(DEFAULT_SLAVE_ID);
        assertThat(testPropertyConfigModbus.getCount()).isEqualTo(DEFAULT_COUNT);
        assertThat(testPropertyConfigModbus.getMask()).isEqualTo(DEFAULT_MASK);
        assertThat(testPropertyConfigModbus.getPollInterval()).isEqualTo(DEFAULT_POLL_INTERVAL);
    }

    @Test
    @Transactional
    public void createPropertyConfigModbusWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = propertyConfigModbusRepository.findAll().size();

        // Create the PropertyConfigModbus with an existing ID
        propertyConfigModbus.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPropertyConfigModbusMockMvc.perform(post("/api/property-config-modbuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(propertyConfigModbus)))
            .andExpect(status().isBadRequest());

        // Validate the PropertyConfigModbus in the database
        List<PropertyConfigModbus> propertyConfigModbusList = propertyConfigModbusRepository.findAll();
        assertThat(propertyConfigModbusList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPropertyConfigModbuses() throws Exception {
        // Initialize the database
        propertyConfigModbusRepository.saveAndFlush(propertyConfigModbus);

        // Get all the propertyConfigModbusList
        restPropertyConfigModbusMockMvc.perform(get("/api/property-config-modbuses?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(propertyConfigModbus.getId().intValue())))
            .andExpect(jsonPath("$.[*].uom").value(hasItem(DEFAULT_UOM)))
            .andExpect(jsonPath("$.[*].controlledTag").value(hasItem(DEFAULT_CONTROLLED_TAG.booleanValue())))
            .andExpect(jsonPath("$.[*].register").value(hasItem(DEFAULT_REGISTER.intValue())))
            .andExpect(jsonPath("$.[*].slaveId").value(hasItem(DEFAULT_SLAVE_ID.intValue())))
            .andExpect(jsonPath("$.[*].count").value(hasItem(DEFAULT_COUNT.intValue())))
            .andExpect(jsonPath("$.[*].mask").value(hasItem(DEFAULT_MASK)))
            .andExpect(jsonPath("$.[*].pollInterval").value(hasItem(DEFAULT_POLL_INTERVAL.intValue())));
    }
    
    @Test
    @Transactional
    public void getPropertyConfigModbus() throws Exception {
        // Initialize the database
        propertyConfigModbusRepository.saveAndFlush(propertyConfigModbus);

        // Get the propertyConfigModbus
        restPropertyConfigModbusMockMvc.perform(get("/api/property-config-modbuses/{id}", propertyConfigModbus.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(propertyConfigModbus.getId().intValue()))
            .andExpect(jsonPath("$.uom").value(DEFAULT_UOM))
            .andExpect(jsonPath("$.controlledTag").value(DEFAULT_CONTROLLED_TAG.booleanValue()))
            .andExpect(jsonPath("$.register").value(DEFAULT_REGISTER.intValue()))
            .andExpect(jsonPath("$.slaveId").value(DEFAULT_SLAVE_ID.intValue()))
            .andExpect(jsonPath("$.count").value(DEFAULT_COUNT.intValue()))
            .andExpect(jsonPath("$.mask").value(DEFAULT_MASK))
            .andExpect(jsonPath("$.pollInterval").value(DEFAULT_POLL_INTERVAL.intValue()));
    }
    @Test
    @Transactional
    public void getNonExistingPropertyConfigModbus() throws Exception {
        // Get the propertyConfigModbus
        restPropertyConfigModbusMockMvc.perform(get("/api/property-config-modbuses/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePropertyConfigModbus() throws Exception {
        // Initialize the database
        propertyConfigModbusRepository.saveAndFlush(propertyConfigModbus);

        int databaseSizeBeforeUpdate = propertyConfigModbusRepository.findAll().size();

        // Update the propertyConfigModbus
        PropertyConfigModbus updatedPropertyConfigModbus = propertyConfigModbusRepository.findById(propertyConfigModbus.getId()).get();
        // Disconnect from session so that the updates on updatedPropertyConfigModbus are not directly saved in db
        em.detach(updatedPropertyConfigModbus);
        updatedPropertyConfigModbus
            .uom(UPDATED_UOM)
            .controlledTag(UPDATED_CONTROLLED_TAG)
            .register(UPDATED_REGISTER)
            .slaveId(UPDATED_SLAVE_ID)
            .count(UPDATED_COUNT)
            .mask(UPDATED_MASK)
            .pollInterval(UPDATED_POLL_INTERVAL);

        restPropertyConfigModbusMockMvc.perform(put("/api/property-config-modbuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedPropertyConfigModbus)))
            .andExpect(status().isOk());

        // Validate the PropertyConfigModbus in the database
        List<PropertyConfigModbus> propertyConfigModbusList = propertyConfigModbusRepository.findAll();
        assertThat(propertyConfigModbusList).hasSize(databaseSizeBeforeUpdate);
        PropertyConfigModbus testPropertyConfigModbus = propertyConfigModbusList.get(propertyConfigModbusList.size() - 1);
        assertThat(testPropertyConfigModbus.getUom()).isEqualTo(UPDATED_UOM);
        assertThat(testPropertyConfigModbus.isControlledTag()).isEqualTo(UPDATED_CONTROLLED_TAG);
        assertThat(testPropertyConfigModbus.getRegister()).isEqualTo(UPDATED_REGISTER);
        assertThat(testPropertyConfigModbus.getSlaveId()).isEqualTo(UPDATED_SLAVE_ID);
        assertThat(testPropertyConfigModbus.getCount()).isEqualTo(UPDATED_COUNT);
        assertThat(testPropertyConfigModbus.getMask()).isEqualTo(UPDATED_MASK);
        assertThat(testPropertyConfigModbus.getPollInterval()).isEqualTo(UPDATED_POLL_INTERVAL);
    }

    @Test
    @Transactional
    public void updateNonExistingPropertyConfigModbus() throws Exception {
        int databaseSizeBeforeUpdate = propertyConfigModbusRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPropertyConfigModbusMockMvc.perform(put("/api/property-config-modbuses")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(propertyConfigModbus)))
            .andExpect(status().isBadRequest());

        // Validate the PropertyConfigModbus in the database
        List<PropertyConfigModbus> propertyConfigModbusList = propertyConfigModbusRepository.findAll();
        assertThat(propertyConfigModbusList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePropertyConfigModbus() throws Exception {
        // Initialize the database
        propertyConfigModbusRepository.saveAndFlush(propertyConfigModbus);

        int databaseSizeBeforeDelete = propertyConfigModbusRepository.findAll().size();

        // Delete the propertyConfigModbus
        restPropertyConfigModbusMockMvc.perform(delete("/api/property-config-modbuses/{id}", propertyConfigModbus.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PropertyConfigModbus> propertyConfigModbusList = propertyConfigModbusRepository.findAll();
        assertThat(propertyConfigModbusList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
