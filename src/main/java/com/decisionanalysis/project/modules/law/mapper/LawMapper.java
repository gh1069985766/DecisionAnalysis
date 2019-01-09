package com.decisionanalysis.project.modules.law.mapper;

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

public interface LawMapper {

    List<LawEntity> selectLawList(Map map);

    Map<String, String> selectTitleAndPathAndKeyById(Map map);


    /**
     *
     * @param map{
     *           keyColumn: 关键词字段
     *           similarityColumn: 相似值字段
     *           tableName: 表名
     *           orderByType：排序 date：按直接降序  similarity：按相似度降序
     * }
     * @return
     */
    List<LawEntity> selectLawListByDynamic(Map map);


    /**
     *
     * @param map
     * @return
     */
    List<LawAllEntity> selectAllListByDynamic(Map map);

    int selectAllListByDynamicTotal(Map map);
}