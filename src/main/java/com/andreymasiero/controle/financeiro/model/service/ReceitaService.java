package com.andreymasiero.controle.financeiro.model.service;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.andreymasiero.controle.financeiro.model.dao.ReceitaDAO;
import com.andreymasiero.controle.financeiro.model.entities.Receita;
import com.google.gson.Gson;

@WebServlet("/receitas")
public class ReceitaService extends HttpServlet {

	private static final long serialVersionUID = 1304451437974770275L;
	
	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws ServletException, IOException {
		List<Receita> receitas = new ReceitaDAO().getReceitas();
		
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		
		resp.setContentType("application/json");
		resp.setHeader("Access-Control-Allow-Origin", "*");
		resp.getWriter().write(new Gson().toJson(receitas));
	
	}

}
