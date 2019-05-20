package io.choerodon.kb.api.dao;

import io.swagger.annotations.ApiModelProperty;

/**
 * @author shinan.chen
 * @since 2019/5/16
 */
public class PageVersionDTO {
    @ApiModelProperty(value = "版本id")
    private Long id;
    @ApiModelProperty(value = "版本名称")
    private String name;
    @ApiModelProperty(value = "页面id")
    private Long pageId;
    @ApiModelProperty(value = "乐观锁")
    private Long objectVersionNumber;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getPageId() {
        return pageId;
    }

    public void setPageId(Long pageId) {
        this.pageId = pageId;
    }

    public Long getObjectVersionNumber() {
        return objectVersionNumber;
    }

    public void setObjectVersionNumber(Long objectVersionNumber) {
        this.objectVersionNumber = objectVersionNumber;
    }
}