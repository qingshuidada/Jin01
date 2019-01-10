package com.mdoa.util;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.awt.Color;
import java.io.File;
import java.io.FileInputStream;


import org.apache.poi.xwpf.converter.pdf.PdfConverter;
import org.apache.poi.xwpf.converter.pdf.PdfOptions;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.commons.io.IOUtils;
import com.lowagie.text.Font;
import com.lowagie.text.pdf.BaseFont;
import fr.opensagres.xdocreport.itext.extension.font.IFontProvider;
public class WordUtil {

    
    

    public static void main(String[] args) throws Exception {
        /*String outPath = "C:\\培训计划.docx";
        wordConverterToPdf(outPath, outPath.replace("docx", "pdf"), "C:/Windows/Fonts/simhei.ttf", BaseFont.IDENTITY_H);*/
	

	String url = System.getProperty("user.dir");
	System.out.println(url);
	
    }
    
    /**
     * 将word文档， 转换成pdf
     * 宋体：STSong-Light
     *
     * @param fontParam1 可以字体的路径，也可以是itextasian-1.5.2.jar提供的字体，比如宋体"STSong-Light"
     * @param fontParam2 和fontParam2对应，fontParam1为路径时，fontParam2=BaseFont.IDENTITY_H，为itextasian-1.5.2.jar提供的字体时，fontParam2="UniGB-UCS2-H"
     * @param tmp        源为word文档， 必须为docx文档
     * @param target     目标输出
     * @throws Exception
     */
    public static void wordConverterToPdf(String tmp, String target, String fontParam1, String fontParam2) {
	
	    File file = new File(target);
	    if(!file.exists()){
		InputStream sourceStream = null;
		    OutputStream targetStream = null;
		    XWPFDocument doc = null;
		    try {
		        sourceStream = new FileInputStream(tmp);
		        targetStream = new FileOutputStream(target);
		        doc = new XWPFDocument(sourceStream);
		        PdfOptions options = PdfOptions.create();
		        //中文字体处理
		        options.fontProvider(new IFontProvider() {
		            @Override
		            public Font getFont(String familyName, String encoding, float size, int style, Color color) {
		                try {
		                    BaseFont bfChinese = BaseFont.createFont(fontParam1, fontParam2, BaseFont.NOT_EMBEDDED);
		                    Font fontChinese = new Font(bfChinese, size, style, color);
		                    if (familyName != null)
		                        fontChinese.setFamily(familyName);
		                    return fontChinese;
		                } catch (Exception e) {
		                    e.printStackTrace();
		                    return null;
		                }
		            }
		        });
		        PdfConverter.getInstance().convert(doc, targetStream, options);
		        
		    } catch (IOException e) {
		        e.printStackTrace();
		    } finally {
		        IOUtils.closeQuietly(doc);
		        IOUtils.closeQuietly(targetStream);
		        IOUtils.closeQuietly(sourceStream);
		    }
	    }
	}

    
    
    
    
}
