package com.bh.daq.web.rest;

import com.bh.daq.DaqApplicationApp;
import com.bh.daq.domain.TagMaster;
import com.bh.daq.repository.TagMasterRepository;

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
 * Integration tests for the {@link TagMasterResource} REST controller.
 */
@SpringBootTest(classes = DaqApplicationApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TagMasterResourceIT {

    private static final String DEFAULT_TAG_ID = "AAAAAAAAAA";
    private static final String UPDATED_TAG_ID = "BBBBBBBBBB";

    private static final String DEFAULT_TAG_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TAG_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private TagMasterRepository tagMasterRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTagMasterMockMvc;

    private TagMaster tagMaster;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TagMaster createEntity(EntityManager em) {
        TagMaster tagMaster = new TagMaster()
            .tagId(DEFAULT_TAG_ID)
            .tagName(DEFAULT_TAG_NAME)
            .description(DEFAULT_DESCRIPTION);
        return tagMaster;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TagMaster createUpdatedEntity(EntityManager em) {
        TagMaster tagMaster = new TagMaster()
            .tagId(UPDATED_TAG_ID)
            .tagName(UPDATED_TAG_NAME)
            .description(UPDATED_DESCRIPTION);
        return tagMaster;
    }

    @BeforeEach
    public void initTest() {
        tagMaster = createEntity(em);
    }

    @Test
    @Transactional
    public void createTagMaster() throws Exception {
        int databaseSizeBeforeCreate = tagMasterRepository.findAll().size();
        // Create the TagMaster
        restTagMasterMockMvc.perform(post("/api/tag-masters")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tagMaster)))
            .andExpect(status().isCreated());

        // Validate the TagMaster in the database
        List<TagMaster> tagMasterList = tagMasterRepository.findAll();
        assertThat(tagMasterList).hasSize(databaseSizeBeforeCreate + 1);
        TagMaster testTagMaster = tagMasterList.get(tagMasterList.size() - 1);
        assertThat(testTagMaster.getTagId()).isEqualTo(DEFAULT_TAG_ID);
        assertThat(testTagMaster.getTagName()).isEqualTo(DEFAULT_TAG_NAME);
        assertThat(testTagMaster.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createTagMasterWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tagMasterRepository.findAll().size();

        // Create the TagMaster with an existing ID
        tagMaster.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTagMasterMockMvc.perform(post("/api/tag-masters")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tagMaster)))
            .andExpect(status().isBadRequest());

        // Validate the TagMaster in the database
        List<TagMaster> tagMasterList = tagMasterRepository.findAll();
        assertThat(tagMasterList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTagMasters() throws Exception {
        // Initialize the database
        tagMasterRepository.saveAndFlush(tagMaster);

        // Get all the tagMasterList
        restTagMasterMockMvc.perform(get("/api/tag-masters?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tagMaster.getId().intValue())))
            .andExpect(jsonPath("$.[*].tagId").value(hasItem(DEFAULT_TAG_ID)))
            .andExpect(jsonPath("$.[*].tagName").value(hasItem(DEFAULT_TAG_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getTagMaster() throws Exception {
        // Initialize the database
        tagMasterRepository.saveAndFlush(tagMaster);

        // Get the tagMaster
        restTagMasterMockMvc.perform(get("/api/tag-masters/{id}", tagMaster.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tagMaster.getId().intValue()))
            .andExpect(jsonPath("$.tagId").value(DEFAULT_TAG_ID))
            .andExpect(jsonPath("$.tagName").value(DEFAULT_TAG_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingTagMaster() throws Exception {
        // Get the tagMaster
        restTagMasterMockMvc.perform(get("/api/tag-masters/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTagMaster() throws Exception {
        // Initialize the database
        tagMasterRepository.saveAndFlush(tagMaster);

        int databaseSizeBeforeUpdate = tagMasterRepository.findAll().size();

        // Update the tagMaster
        TagMaster updatedTagMaster = tagMasterRepository.findById(tagMaster.getId()).get();
        // Disconnect from session so that the updates on updatedTagMaster are not directly saved in db
        em.detach(updatedTagMaster);
        updatedTagMaster
            .tagId(UPDATED_TAG_ID)
            .tagName(UPDATED_TAG_NAME)
            .description(UPDATED_DESCRIPTION);

        restTagMasterMockMvc.perform(put("/api/tag-masters")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTagMaster)))
            .andExpect(status().isOk());

        // Validate the TagMaster in the database
        List<TagMaster> tagMasterList = tagMasterRepository.findAll();
        assertThat(tagMasterList).hasSize(databaseSizeBeforeUpdate);
        TagMaster testTagMaster = tagMasterList.get(tagMasterList.size() - 1);
        assertThat(testTagMaster.getTagId()).isEqualTo(UPDATED_TAG_ID);
        assertThat(testTagMaster.getTagName()).isEqualTo(UPDATED_TAG_NAME);
        assertThat(testTagMaster.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingTagMaster() throws Exception {
        int databaseSizeBeforeUpdate = tagMasterRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTagMasterMockMvc.perform(put("/api/tag-masters")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tagMaster)))
            .andExpect(status().isBadRequest());

        // Validate the TagMaster in the database
        List<TagMaster> tagMasterList = tagMasterRepository.findAll();
        assertThat(tagMasterList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTagMaster() throws Exception {
        // Initialize the database
        tagMasterRepository.saveAndFlush(tagMaster);

        int databaseSizeBeforeDelete = tagMasterRepository.findAll().size();

        // Delete the tagMaster
        restTagMasterMockMvc.perform(delete("/api/tag-masters/{id}", tagMaster.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TagMaster> tagMasterList = tagMasterRepository.findAll();
        assertThat(tagMasterList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
