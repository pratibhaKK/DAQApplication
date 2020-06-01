package com.bh.daq.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.bh.daq.web.rest.TestUtil;

public class TagMasterTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TagMaster.class);
        TagMaster tagMaster1 = new TagMaster();
        tagMaster1.setId(1L);
        TagMaster tagMaster2 = new TagMaster();
        tagMaster2.setId(tagMaster1.getId());
        assertThat(tagMaster1).isEqualTo(tagMaster2);
        tagMaster2.setId(2L);
        assertThat(tagMaster1).isNotEqualTo(tagMaster2);
        tagMaster1.setId(null);
        assertThat(tagMaster1).isNotEqualTo(tagMaster2);
    }
}
