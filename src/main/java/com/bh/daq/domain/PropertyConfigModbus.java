package com.bh.daq.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A PropertyConfigModbus.
 */
@Entity
@Table(name = "property_config_modbus")
public class PropertyConfigModbus implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "uom")
    private String uom;

    @Column(name = "controlled_tag")
    private Boolean controlledTag;

    @Column(name = "register")
    private Long register;

    @Column(name = "slave_id")
    private Long slaveId;

    @Column(name = "count")
    private Long count;

    @Column(name = "mask")
    private String mask;

    @Column(name = "poll_interval")
    private Long pollInterval;

    @OneToOne
    @JoinColumn(unique = true)
    private TagMaster tag;

    @OneToOne
    @JoinColumn(unique = true)
    private Template templateId;

    @ManyToOne
    @JsonIgnoreProperties(value = "propertyConfigModbuses", allowSetters = true)
    private Template propertiesModbus;

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

    public PropertyConfigModbus uom(String uom) {
        this.uom = uom;
        return this;
    }

    public void setUom(String uom) {
        this.uom = uom;
    }

    public Boolean isControlledTag() {
        return controlledTag;
    }

    public PropertyConfigModbus controlledTag(Boolean controlledTag) {
        this.controlledTag = controlledTag;
        return this;
    }

    public void setControlledTag(Boolean controlledTag) {
        this.controlledTag = controlledTag;
    }

    public Long getRegister() {
        return register;
    }

    public PropertyConfigModbus register(Long register) {
        this.register = register;
        return this;
    }

    public void setRegister(Long register) {
        this.register = register;
    }

    public Long getSlaveId() {
        return slaveId;
    }

    public PropertyConfigModbus slaveId(Long slaveId) {
        this.slaveId = slaveId;
        return this;
    }

    public void setSlaveId(Long slaveId) {
        this.slaveId = slaveId;
    }

    public Long getCount() {
        return count;
    }

    public PropertyConfigModbus count(Long count) {
        this.count = count;
        return this;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public String getMask() {
        return mask;
    }

    public PropertyConfigModbus mask(String mask) {
        this.mask = mask;
        return this;
    }

    public void setMask(String mask) {
        this.mask = mask;
    }

    public Long getPollInterval() {
        return pollInterval;
    }

    public PropertyConfigModbus pollInterval(Long pollInterval) {
        this.pollInterval = pollInterval;
        return this;
    }

    public void setPollInterval(Long pollInterval) {
        this.pollInterval = pollInterval;
    }

    public TagMaster getTag() {
        return tag;
    }

    public PropertyConfigModbus tag(TagMaster tagMaster) {
        this.tag = tagMaster;
        return this;
    }

    public void setTag(TagMaster tagMaster) {
        this.tag = tagMaster;
    }

    public Template getTemplateId() {
        return templateId;
    }

    public PropertyConfigModbus templateId(Template template) {
        this.templateId = template;
        return this;
    }

    public void setTemplateId(Template template) {
        this.templateId = template;
    }

    public Template getPropertiesModbus() {
        return propertiesModbus;
    }

    public PropertyConfigModbus propertiesModbus(Template template) {
        this.propertiesModbus = template;
        return this;
    }

    public void setPropertiesModbus(Template template) {
        this.propertiesModbus = template;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PropertyConfigModbus)) {
            return false;
        }
        return id != null && id.equals(((PropertyConfigModbus) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PropertyConfigModbus{" +
            "id=" + getId() +
            ", uom='" + getUom() + "'" +
            ", controlledTag='" + isControlledTag() + "'" +
            ", register=" + getRegister() +
            ", slaveId=" + getSlaveId() +
            ", count=" + getCount() +
            ", mask='" + getMask() + "'" +
            ", pollInterval=" + getPollInterval() +
            "}";
    }
}
