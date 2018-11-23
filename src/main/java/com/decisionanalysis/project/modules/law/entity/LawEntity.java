package com.decisionanalysis.project.modules.law.entity;

import com.decisionanalysis.framework.web.domain.BaseEntity;

import java.util.Date;

/**
 * Des:
 *
 * @author zhuhm@zjhcsoft.com
 * @date 2018/11/1
 */
public class LawEntity extends BaseEntity {

    private static final long serialVersionUID = 1L;

    private int id;

    private String title;

    private String areaName;

    private Date time;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }
}
