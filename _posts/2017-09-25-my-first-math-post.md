---
layout: post
title: "Math Post Reference"
date: 2015-04-30
category: Math
tags: [TeX, Reference]
---

This is a reference post for using Latex based on Mathjax. This will updated regularly. Please check the commit date for more accurate publishing time.
This post inspired by [this](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)


### Basic Operation

| Form | Syntax | Description |
| ----- | ----- | ----------- |
| $a$   | `a`   | symbol declaration |
| $a_1$ | `a_1` | subscript |
| $a^2$ | `a^2` | superscript |
| $a^2_1$ | `a^2_1` | subscript and superscript |
| $a^20_1$ | `a^20_1` | non Grouping |
| $a^{20}_1$ | `a^{20}_1` | Grouping |
| $\frac{\sqrt[3] x^3}{y}$ | `\frac{\sqrt x^3}{y}` | Fraction and root |
| $(\frac{\sqrt x^3}{y})$ | `(\frac{\sqrt x^3}{y})` | Unadjusted bracket size |
| $\left(\frac{\sqrt x^3}{y} \right)$ | `$\left(\frac{\sqrt x^3}{y} \right)` | Adjusted Bracket Size |

---------------------------------------------------------

### Symbols and Notations

| Form | Syntax | Description |
| ----- | ------ | ----------- |
| $\lt \le \leq \leqq \leqslant$ | `\lt \le \leq \leqq \leqslant` | Less than comparator |
| $\gt \ge \geq \geqq \geqslant$ | `\gt \ge \geq \geqq \geqslant` | greater than comparator |
| $= \neq \times \div \pm \mp $ | `= \neq \times \div \pm \mp` | operator |
| $\cup \cap \setminus \subset \subseteq \subsetneq \supset \in \notin$ | `\cup \cap \setminus \subset \subseteq \subsetneq \supset \in \notin` | set operation |
| $\land \lor \lnot \forall \exists \top \bot \vdash \vDash$ | `\land \lor \lnot \forall \exists \top \bot \vdash \vDash` | set quantifier |
| $\to \rightarrow \leftarrow \Rightarrow \Leftarrow \mapsto$ | ` \to \rightarrow \leftarrow \Rightarrow \Leftarrow \mapsto` | arrow |
| $\approx \sim \simeq \cong \equiv \prec \lhd \therefore$ | `\approx \sim \simeq \cong \equiv \prec \lhd \therefore` | relation |

| $\cdots \ldots$| `\cdots \ldots` | cdots is centered whereas ldots is lowered |
| $\infty \aleph_0 \nabla \partial \Im \Re$ | `\infty \aleph_0 \nabla \partial \Im \Re` | special symbol |


---------------------------------------------------------

### Spacing

| Form | Syntax |
| ------ | ------ | 
| $a\,b$ | `a\,b`|
| $a\;b$ | `a\;b`|
| $a\quad b$ | `a\quad b`|
| $a\qquad b$ | `a\qquad b`|


---------------------------------------------------------

### Character Accent

| Form | Syntax |
| ----- | -----------| 
| $\check{a}$ | `\check{a}` |
| $\acute{a}$ | `\acute{a}` |
| $\grave{a}$ | `\grave{a}` |
| $\vec{a}$   | `\vec{a}` |
| $\bar{a}$   | `\bar{a}` |
| $\hat{a}$   | `\hat{a}` |
| $\tilde{a}$ | `\tilde{a}` |
| $\dot{a} \ddot{a} \dddot{a}$ | `\dot{a} \ddot{a} \dddot{a}` |


---------------------------------------------------------

### Greek Letter

| Form | Syntax |
| ----- | ------ |
| $\alpha$ | `\alpha` |
| $\beta$ | `\beta, \Beta` |
| $\gamma,\Gamma$ | `\gamma, \Gamma` |
| $\delta,\Delta$ | `\delta, \Delta` |
| $\epsilon,\varepsilon$ | `\epsilon, \varepsilon` |
| $\zeta$ | `\zeta` |
| $\theta,\Theta,\vartheta$ | `\theta,\Theta,\vartheta` | 
| $\kappa$ | `\kappa` |
| $\lambda,\Lambda$ | `\lambda, \Lambda` |
| $\mu$ | `\mu` |
| $\nu$ | `\nu` |
| $\xi,\Xi$ | `\xi, \Xi` |
| $\pi,\Pi,\varpi$ | `\pi, \Pi, \varpi` |
| $\rho,\varrho$ | `\rho, \varrho` |
| $\sigma,\Sigma,\varsigma$ | `\sigma, \Sigma, \varsigma` |
| $\tau$ | `\tau` |
| $\upsilon,\Upsilon$ | `\upsilon, \Upsilon` |
| $\phi,\Phi,\varphi$ | `\phi, \Phi, \varphi` |
| $\chi$ | `\chi` |
| $\psi,\Psi$ | `\psi, \Psi` |
| $\omega,\Omega$ | `\omega, \Omega` |


---------------------------------------------------------

### Operator

| Form | Syntax | Description |
| ----- | ------ | ----------- |
| $\sum$ | `\sum` | summation |
| $\sum_i^\infty$ | `\sum_i^\infty` | summation with bound |
| $\sum_{i=1}^\infty{\frac{1}{i^2}}$ |`$\sum_{i=1}^\infty{\frac{1}{i^2}}`| complete summation with a group |
| $\int$ | `\int` | integral |
| $\int_i^\infty$ | `int_i^\infty` | integral with bound |
| $\int_{i=1}^\infty{\frac{1}{i^2}}$ |`$\int_{i=1}^\infty{\frac{1}{i^2}}`| complete integral with a group |
| $\bigcup$ | `\bigcup` | Union |
| $\bigcap$ | `\bigcap` | Intersect |
| $\iint$ | `\iint` | double integral |
| $\iiint$ | `\iiint` | triple integral |
| $\idotsint$ | `\idotsint` | multiple integral |


---------------------------------------------------------

### Matrices
<center>
$$
	\begin{matrix}
		1 & x & y^2 \\
		1 & x & y^2 \\
		1 & x & y^2 \\
	\end{matrix}
$$
</center>
*syntax*
```
$$
	\begin{matrix}
		1 & x & y^2 \\
		1 & x & y^2 \\
		1 & x & y^2 \\
	\end{matrix}
$$
```

$$
	\begin{pmatrix}
		1 & x \\
		x & 1 \\
	\end{pmatrix}

	\begin{bmatrix}
		1 & x \\
		x & 1 \\
	\end{bmatrix}
	\begin{Bmatrix}
		1 & x \\
		x & 1 \\
	\end{Bmatrix}
	\begin{vmatrix}
		1 & x \\
		x & 1 \\
	\end{vmatrix}
	\begin{Vmatrix}
		1 & x \\
		x & 1 \\
	\end{Vmatrix}
	\left\langle
	\begin{matrix}
		1 & x \\
		x & 1 \\
	\end{matrix}
	\right\rangle
		
$$


*syntax*
```
$$
	\begin{pmatrix}
		1 & x \\
		x & 1 \\
	\end{pmatrix}
	\begin{bmatrix}
		1 & x \\
		x & 1 \\
	\end{bmatrix}
	\begin{Bmatrix}
		1 & x \\
		x & 1 \\
	\end{Bmatrix}

	\begin{vmatrix}
		1 & x \\
		x & 1 \\
	\end{vmatrix}
	\begin{Vmatrix}
		1 & x \\
		x & 1 \\
	\end{Vmatrix}
	\left\langle
	\begin{matrix}
		1 & x \\
		x & 1 \\
	\end{matrix}
	\right\rangle
$$
```

-------------------

### Coupled Equation

$$
\begin{cases}
	a_1x + b_1y = d_1 \\
	a_2x + b_2y = d_3
\end{cases}
$$

*syntax*
```
$$
\begin{cases}
	a_1x + b_1y = d_1 \\
	a_2x + b_2y = d_3
\end{cases}
$$
```

$$
\begin{align}
\sqrt{37} & = \sqrt{\frac{73^2-1}{12^2}} \\
	  & = \sqrt{\frac{73^2}{12^2}\cdot\frac{73^2-1}{73^2}}
\end{align}
$$

```
$$
\begin{align}
\sqrt{37} & = \sqrt{\frac{73^2-1}{12^2}} \\
	  & = \sqrt{\frac{73^2}{12^2}\cdot\frac{73^2-1}{73^2}}
\end{align}
$$
```
