package com.andreymasiero.controle.financeiro.model.dao;

import java.util.ArrayList;
import java.util.List;

import com.andreymasiero.controle.financeiro.model.entities.Receita;

public class ReceitaDAO {

	private static List<Receita> RECEITAS = new ArrayList<Receita>();
	
	static {
		gerarIdEAdicionar(new Receita("Salário", "Crédito", "24/10/2019", 1500.0));
		gerarIdEAdicionar(new Receita("Conta de Luz", "Débito", "28/10/2019", -102.74));
		gerarIdEAdicionar(new Receita("Conta de Água", "Débito", "30/10/2019", -52.25));
		gerarIdEAdicionar(new Receita("Salário", "Crédito", "24/11/2019", 1500.0));
		gerarIdEAdicionar(new Receita("Mercado", "Débito", "25/11/2019", -800.0));
	}
	
	public void adicionar(Receita receita) {
		gerarIdEAdicionar(receita);
	}

	private static void gerarIdEAdicionar(Receita receita) {
		Long id = RECEITAS.size() + 1l;
		receita.setId(id);
		RECEITAS.add(receita);		
	}
	
	public List<Receita> getReceitas() {
		return RECEITAS;
	}
	
	
}
