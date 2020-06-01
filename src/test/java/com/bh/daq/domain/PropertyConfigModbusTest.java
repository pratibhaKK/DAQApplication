package com.bh.daq.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.bh.daq.web.rest.TestUtil;

public class PropertyConfigModbusTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PropertyConfigModbus.class);
        PropertyConfigModbus propertyConfigModbus1 = new PropertyConfigModbus();
        propertyConfigModbus1.setId(1L);
        PropertyConfigModbus propertyConfigModbus2 = new PropertyConfigModbus();
        propertyConfigModbus2.setId(propertyConfigModbus1.getId());
        assertThat(propertyConfigModbus1).isEqualTo(propertyConfigModbus2);
        propertyConfigModbus2.setId(2L);
        assertThat(propertyConfigModbus1).isNotEqualTo(propertyConfigModbus2);
        propertyConfigModbus1.setId(null);
        assertThat(propertyConfigModbus1).isNotEqualTo(propertyConfigModbus2);
    }
}
