// Seleciona os elementos do formulario.
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense"); 
const category = document.getElementById("category");

// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul") 


// captura o evento de input para formatar o valor.
    amount.oninput = () => {
        // obten o valor atual do input re remove os caracteres nao numericos.
        let value = amount.value.replace(/\D/g, "")
        

        // tranforma o valor em centavos .
        value = Number(value) / 100

        // Atualiza o valor do input
        amount.value = formatCurrencyEUR(value)
    }

// Função para formatar o valor como moeda europeia (EUR)
function formatCurrencyEUR(value) {
    //
    value = value.toLocaleString("pt-PT", {
        style: "currency",
        currency: "EUR",
    })
    // Retorna o valor formatado
    return value
}
// captura o evento de submit do formulario para obter os valores.
form.onsubmit = (event) => {
    // previne o comportamento padrão do formulario (recarregar a pagina)
    event.preventDefault()

    // cria um objeto com os valores do formulario.
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),

    }
    // chamando a funcao que ira adicionar o item na lista.
    expenseAdd(newExpense)

}

function expenseAdd(newExpense) {
    try {
        // Criando elemento para adicionar o item (li) na lista (ul)
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        // Cria o icone da categoria.
        const expenseIcon = document.createElement("img");
        expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
        expenseIcon.setAttribute("alt", newExpense.category_name);

        // Cria a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // Cria o nome da despesa 
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        // Cria a categoria da despesa. 
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // add name e categoria na div das informacoes da despesa.
        expenseInfo.append(expenseName, expenseCategory)


        // Adiciona as informacoes no item
        expenseItem.append(expenseIcon, expenseInfo)

        // Adiciona o item na lista 
        expenseList.append(expenseItem)

    } catch (error) {
        alert("Nao foi possivel atualizar a lista de despesas.")
        console.log(error)
    }
} 