package com.decisionanalysis.project.modules.law.entity;

/**
 * Des:
 *
 * @author zhuhm@zjhcsoft.com
 * @date 2018/12/18
 */
public enum LawSimilarityColumnEnum {

    WZ_S("waizi", "waizi"),
    NZ_S("neizi", "neizi"),
    ZJL_S("zijiangli", "zijiangli"),

    YY_S("yiyao", "yiyao"),
    CL_S("cailiao", "cailiao"),
    ZB_S("zhuangbei", "zhuangbei"),
    SZJJ_S("shuzijingji", "shuzijingji"),
    MC_S("muchan", "muchan"),
    BDT_S("bandaoti", "bandaoti"),
    YDJJ_S("yindaojijin", "yindaojijin"),
    TD_S("tudi", "tudi"),
    ZR_S("zhunru", "zhunru"),
    CJ_S("cujin","cujin"),
    CY_S("domain", "domain"),

    CYFC_S("support", "support"),
    OA_S("office_allowance", "office_allowance"),
    DA_S("daily_allowance", "daily_allowance"),
    RE_S("recruitment", "recruitment"),
    RR_S("recruit_remuneration", "recruit_remuneration"),
    REM_S("remuneration", "remuneration"),
    HS_S("housing", "housing"),
    INN_S("innovation", "innovation"),
    RC_S("rencai", "rencai");

    private String similarityColumnName;
    private String similarityColumn;

    LawSimilarityColumnEnum(String similarityColumnName, String similarityColumn) {
        this.similarityColumn = similarityColumn;
        this.similarityColumnName = similarityColumnName;
    }

    public String getSimilarityColumnName() {
        return similarityColumnName;
    }

    public String getSimilarityColumn() {
        return similarityColumn;
    }

    public static String getSimilarityColumnNameForQuery(String similarityColumn) {
        for (LawSimilarityColumnEnum lawSimilarityColumnEnum : LawSimilarityColumnEnum.values()) {
            if (similarityColumn.equals(lawSimilarityColumnEnum.similarityColumn)) {
                return lawSimilarityColumnEnum.similarityColumnName;
            }
        }
        return null;
    }
}
