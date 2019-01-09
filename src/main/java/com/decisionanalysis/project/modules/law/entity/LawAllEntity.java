package com.decisionanalysis.project.modules.law.entity;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.util.Date;

/**
 * Des:
 *
 * @author zhuhm@zjhcsoft.com
 * @date 2018/12/18
 */
public class LawAllEntity {
    /**
     * id
     */
    private Integer id;
    /**
     * 标题
     */
    private String title;
    /**
     * 地名
     */
    private String region;
    /**
     * 关键词
     */
    private String rcKeyWords;
    /**
     * 关键词
     */
    private String cxKeyWords;
    /**
     * 关键词
     */
    private String cyKeyWords;
    /**
     * 相似度
     */
    private String similarity;


    /**
     * 发布时间
     */
    @JsonFormat(pattern = "yyyy-MM-dd", timezone="GMT+8")
    private Date publishDate;

    /**
     * 政策范围
     */
    private String rank;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getRcKeyWords() {
        return rcKeyWords;
    }

    public void setRcKeyWords(String rcKeyWords) {
        this.rcKeyWords = rcKeyWords;
    }

    public String getCxKeyWords() {
        return cxKeyWords;
    }

    public void setCxKeyWords(String cxKeyWords) {
        this.cxKeyWords = cxKeyWords;
    }

    public String getCyKeyWords() {
        return cyKeyWords;
    }

    public void setCyKeyWords(String cyKeyWords) {
        this.cyKeyWords = cyKeyWords;
    }

    public String getSimilarity() {
        return similarity;
    }

    public void setSimilarity(String similarity) {
        this.similarity = similarity;
    }

    public Date getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(Date publishDate) {
        this.publishDate = publishDate;
    }

    public String getRank() {
        return rank;
    }

    public void setRank(String rank) {
        this.rank = rank;
    }
}
