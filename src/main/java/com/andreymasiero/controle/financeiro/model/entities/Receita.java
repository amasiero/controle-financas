package com.andreymasiero.controle.financeiro.model.entities;

public class Receita {

	private Long id;
	private String descricao;
	private String categoria;
	private String data;
	private Double valor;

	public Receita(String descricao, String categoria, String data, Double valor) {
		this.descricao = descricao;
		this.categoria = categoria;
		this.data = data;
		this.valor = valor;
	}

	public String getDescricao() {
		return descricao;
	}

	public String getCategoria() {
		return categoria;
	}

	public String getData() {
		return data;
	}

	public Double getValor() {
		return valor;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

}
