package com.decisionanalysis.project.modules.keyWord.service;

import com.decisionanalysis.project.modules.keyWord.entity.KeyWordEntity;

import java.util.List;
import java.util.Map;

/**
 * Des:
 *
 * @author zhuhm@zjhcsoft.com
 * @date 2019/3/29
 */
public interface IKeyWordService {
    /**
     * 保存
     * @param keyWordEntity
     */
    void save(KeyWordEntity keyWordEntity);

    /**
     * 保存list
     * @param keyWordEntity
     */
    void saveAll(List<KeyWordEntity> keyWordEntity);

    /**
     * 查询列表
     * @param map
     * @return
     */
    List<KeyWordEntity> selectKeyWordListByCondition(Map map);

}
