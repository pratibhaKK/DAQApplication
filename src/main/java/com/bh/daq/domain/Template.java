package com.bh.daq.domain;

import io.swagger.annotations.ApiModel;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * For device Template creation
 */
@ApiModel(description = "For device Template creation")
@Entity
@Table(name = "template")
public class Template implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "template_name")
    private String templateName;

    @Column(name = "description")
    private String description;

    @Column(name = "protocol_supported")
    private String protocolSupported;

    @OneToOne
    @JoinColumn(unique = true)
    private Device device;

    @OneToMany(mappedBy = "propertiesModbus")
    private Set<PropertyConfigModbus> propertyConfigModbuses = new HashSet<>();

    @OneToMany(mappedBy = "properties")
    private Set<Property> properties = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTemplateName() {
        return templateName;
    }

    public Template templateName(String templateName) {
        this.templateName = templateName;
        return this;
    }

    public void setTemplateName(String templateName) {
        this.templateName = templateName;
    }

    public String getDescription() {
        return description;
    }

    public Template description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getProtocolSupported() {
        return protocolSupported;
    }

    public Template protocolSupported(String protocolSupported) {
        this.protocolSupported = protocolSupported;
        return this;
    }

    public void setProtocolSupported(String protocolSupported) {
        this.protocolSupported = protocolSupported;
    }

    public Device getDevice() {
        return device;
    }

    public Template device(Device device) {
        this.device = device;
        return this;
    }

    public void setDevice(Device device) {
        this.device = device;
    }

    public Set<PropertyConfigModbus> getPropertyConfigModbuses() {
        return propertyConfigModbuses;
    }

    public Template propertyConfigModbuses(Set<PropertyConfigModbus> propertyConfigModbuses) {
        this.propertyConfigModbuses = propertyConfigModbuses;
        return this;
    }

    public Template addPropertyConfigModbus(PropertyConfigModbus propertyConfigModbus) {
        this.propertyConfigModbuses.add(propertyConfigModbus);
        propertyConfigModbus.setPropertiesModbus(this);
        return this;
    }

    public Template removePropertyConfigModbus(PropertyConfigModbus propertyConfigModbus) {
        this.propertyConfigModbuses.remove(propertyConfigModbus);
        propertyConfigModbus.setPropertiesModbus(null);
        return this;
    }

    public void setPropertyConfigModbuses(Set<PropertyConfigModbus> propertyConfigModbuses) {
        this.propertyConfigModbuses = propertyConfigModbuses;
    }

    public Set<Property> getProperties() {
        return properties;
    }

    public Template properties(Set<Property> properties) {
        this.properties = properties;
        return this;
    }

    public Template addProperty(Property property) {
        this.properties.add(property);
        property.setProperties(this);
        return this;
    }

    public Template removeProperty(Property property) {
        this.properties.remove(property);
        property.setProperties(null);
        return this;
    }

    public void setProperties(Set<Property> properties) {
        this.properties = properties;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Template)) {
            return false;
        }
        return id != null && id.equals(((Template) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Template{" +
            "id=" + getId() +
            ", templateName='" + getTemplateName() + "'" +
            ", description='" + getDescription() + "'" +
            ", protocolSupported='" + getProtocolSupported() + "'" +
            "}";
    }
}
