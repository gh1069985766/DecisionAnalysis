package com.decisionanalysis.project.modules.law.service;

import com.decisionanalysis.project.modules.law.entity.LawAllEntity;
import com.decisionanalysis.project.modules.law.entity.LawEntity;

import java.util.List;
import java.util.Map;

/**
 * Des:
 *
 * @author zhuhm@zjhcsoft.com
 * @date 2018/11/1
 */
public interface ILawService {
    List<LawEntity> selectLawList(Map map);

    Map<String, String> selectTitleAndPathAndKeyById(int id);

    List<LawEntity> selectLawListByDynamic(Map map);

    List<LawAllEntity> selectAllListByCondition(Map map);

    int selectAllListByConditionTotal(Map map);


}
