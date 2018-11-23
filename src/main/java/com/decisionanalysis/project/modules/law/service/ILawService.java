package com.decisionanalysis.project.modules.law.service;

import com.decisionanalysis.project.modules.law.entity.LawEntity;

import java.util.List;

/**
 * Des:
 *
 * @author zhuhm@zjhcsoft.com
 * @date 2018/11/1
 */
public interface ILawService {
    List<LawEntity> selectLawList(LawEntity lawEntity);
}
