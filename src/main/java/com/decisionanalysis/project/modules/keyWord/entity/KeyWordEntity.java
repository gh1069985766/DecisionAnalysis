package com.decisionanalysis.project.modules.keyWord.entity;

import com.decisionanalysis.framework.web.domain.BaseEntity;

import java.time.LocalDateTime;

/**
 * Des:
 * 查询搜索关键字
 * @author zhuhm@zjhcsoft.com
 * @date 2019/3/29
 */
public class KeyWordEntity extends BaseEntity {

    /** id */
    private Integer id ;
    /** 大类名称 */
    private String bigType ;
    /** 大类标识 */
    private String bigTypeCode ;
    /** 小类名称 */
    private String smallType ;
    /** 是否历史(0旧 ， 1新) */
    private String history ;
    /** 创建人 */
    private String createdBy ;
    /** 创建时间 */
    private LocalDateTime createdTime ;
    /** 更新人 */
    private String updatedBy ;
    /** 更新时间 */
    private LocalDateTime updatedTime ;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getBigType() {
        return bigType;
    }

    public void setBigType(String bigType) {
        this.bigType = bigType;
    }

    public String getBigTypeCode() {
        return bigTypeCode;
    }

    public void setBigTypeCode(String bigTypeCode) {
        this.bigTypeCode = bigTypeCode;
    }

    public String getSmallType() {
        return smallType;
    }

    public void setSmallType(String smallType) {
        this.smallType = smallType;
    }

    public String getHistory() {
        return history;
    }

    public void setHistory(String history) {
        this.history = history;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(LocalDateTime createdTime) {
        this.createdTime = createdTime;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public LocalDateTime getUpdatedTime() {
        return updatedTime;
    }

    public void setUpdatedTime(LocalDateTime updatedTime) {
        this.updatedTime = updatedTime;
    }
}
