package com.decisionanalysis.project.modules.keyWord.mapper;

import com.decisionanalysis.project.modules.keyWord.entity.KeyWordEntity;

import java.util.List;
import java.util.Map;

/**
 * Des:
 *
 * @author zhuhm@zjhcsoft.com
 * @date 2019/4/1
 */
public interface KeyWordMapper {

    /**
     * 保存
     * @param keyWordEntity
     */
    void insertKeyWord(KeyWordEntity keyWordEntity);


    /**
     * 查询记录
     * @param map
     * @return
     */
    List<KeyWordEntity> selectKeyWordListByCondition(Map map);

    /**
     * 逻辑删除 留下修改记录
     */
    void deleteKeyWordHistory();
}
