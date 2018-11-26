package com.decisionanalysis.project.modules.law.mapper;

import com.decisionanalysis.project.modules.law.entity.LawEntity;

import java.util.List;
import java.util.Map;

/**
 * Des:
 *
 * @author zhuhm@zjhcsoft.com
 * @date 2018/11/1
 */

public interface LawMapper {

    List<LawEntity> selectLawList(Map map);

    Map<String, String> selectTitleAndPathAndKeyById(Map map);
}