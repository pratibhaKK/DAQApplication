package com.bh.daq.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Property.
 */
@Entity
@Table(name = "property")
public class Property implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "uom")
    private String uom;

    @Column(name = "controlled_tag")
    private Boolean controlledTag;

    @Column(name = "poll_interval")
    private Long pollInterval;

    @OneToOne
    @JoinColumn(unique = true)
    private TagMaster tagId;

    @OneToOne
    @JoinColumn(unique = true)
    private Template templateId;

    @ManyToOne
    @JsonIgnoreProperties(value = "properties", allowSetters = true)
    private Template properties;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUom() {
        return uom;
    }

    public Property uom(String uom) {
        this.uom = uom;
        return this;
    }

    public void setUom(String uom) {
        this.uom = uom;
    }

    public Boolean isControlledTag() {
        return controlledTag;
    }

    public Property controlledTag(Boolean controlledTag) {
        this.controlledTag = controlledTag;
        return this;
    }

    public void setControlledTag(Boolean controlledTag) {
        this.controlledTag = controlledTag;
    }

    public Long getPollInterval() {
        return pollInterval;
    }

    public Property pollInterval(Long pollInterval) {
        this.pollInterval = pollInterval;
        return this;
    }

    public void setPollInterval(Long pollInterval) {
        this.pollInterval = pollInterval;
    }

    public TagMaster getTagId() {
        return tagId;
    }

    public Property tagId(TagMaster tagMaster) {
        this.tagId = tagMaster;
        return this;
    }

    public void setTagId(TagMaster tagMaster) {
        this.tagId = tagMaster;
    }

    public Template getTemplateId() {
        return templateId;
    }

    public Property templateId(Template template) {
        this.templateId = template;
        return this;
    }

    public void setTemplateId(Template template) {
        this.templateId = template;
    }

    public Template getProperties() {
        return properties;
    }

    public Property properties(Template template) {
        this.properties = template;
        return this;
    }

    public void setProperties(Template template) {
        this.properties = template;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Property)) {
            return false;
        }
        return id != null && id.equals(((Property) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Property{" +
            "id=" + getId() +
            ", uom='" + getUom() + "'" +
            ", controlledTag='" + isControlledTag() + "'" +
            ", pollInterval=" + getPollInterval() +
            "}";
    }
}
