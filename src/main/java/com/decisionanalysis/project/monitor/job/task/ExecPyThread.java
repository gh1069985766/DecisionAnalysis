package com.decisionanalysis.project.monitor.job.task;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.BufferedReader;
import java.io.InputStreamReader;

/**
 * Des:
 *
 * @author zhuhm@zjhcsoft.com
 * @date 2019/4/9
 */
public class ExecPyThread extends Thread{
    private static Logger logger = LoggerFactory.getLogger(ExecPyThread.class);
    @Override
    public void run() {
        try {
            String[] arguments = new String[] {"python","/home/crawler/mainManager.py"};
            Process process = Runtime.getRuntime().exec(arguments);
            BufferedReader in = new BufferedReader(new InputStreamReader(process.getInputStream()));

            String line = null;
            while ((line = in.readLine()) != null) {
                System.out.println(line);  //在java编译器中打印.py文件的执行结果
            }
            in.close();
            int re = process.waitFor();//因为是process这个进程调用.py文件， 所以要将当前进程阻塞等待.py文件执行完毕， 若果.py文件成功运行完毕，此方法将返回0，代表执行成功
            System.out.println(re);


//            super.run();
        } catch (Exception e) {
            e.printStackTrace();
            logger.error(e.toString());
        }

    }
}
