import json

#FLAGS de configuração
FLAG_DICT_CHARS = {'æ': 'a','¢': 'c', 'ø': 'o', 'ß': 'b'}
FLAG_PATH = 'broken-database.json'
FLAG_FIX_DATABASE = 'fixed-database.json'

#Abre arquivo broken-database.json para leitura
def openFile(FLAG_PATH):
    with open(FLAG_PATH,'r') as f:
        data = json.load(f)
    return data

#Função 1 - Varre todos os names e substitui de acordo com valores declarados na FLAG_CHARS
def fixText(data,dict_chars):
    for i,j in dict_chars.items():
         data = data.replace(i,j)   
    return data

#Função 2 - Varre preços que estão como string e converte simutaneamente para float, inclusive valores do tipo int
def fixPrice(data):
    for key in data:
        if(type(key['price']) is str):
            key['price'] = float(key['price'])
        if(type(key['price']) is int):
            key['price'] = float(key['price'])

#Função 3 - Varre arquivo em busca da key quantity, caso não encontre retorna somente a posição do dict não encontrado.
def fixQuantity(data):
    for key in range(len(data)):
        if('quantity' not in data[key]):
            data[key] = {'id': data[key]['id'], 'name': data[key]['name'], 'quantity': 0, 'price': data[key]['price'], 'category': data[key]['category']}

#Cria novo arquivo
def writeNewFile(new_json,new_database):
    with open(FLAG_FIX_DATABASE,'w', encoding='utf-8') as f:
        json.dump(new_json,f, ensure_ascii=False, indent=1)


#Função 1 calcula estoque de acordo com preço do produto e quantidade
def calcQuantity(new):
    calc_dict = {}
    calc_list = []
    for x in range(len(new)):
        if(new[x]['category'] not in calc_list):
            calc_dict["Categoria"] = calc_list.append(new[x]['category'])
            calc_dict["Valor Total"] = calc_list.append(new[x]['quantity'] * new[x]['price'])
    return calc_list

#Função 2 ordernar produto categoria e id
def orderList(new):
    categorias = sorted(new, key=lambda k: k['category'])
    ids = sorted(new, key=lambda k: k['id'])
    print("##########################################################")
    for x in categorias:
        print("CATEGORIA: ",x['category'], "-NOME PRODUTO: ",x['name'])
    print("##########################################################")
    for x in ids:        
        print("ID: ",x['id'], "- NOME PRODUTO: ",x['name'])


 
#CHAMADAS

data = openFile(FLAG_PATH)

#chamada Corrige texto
for key in data:
    key['name'] = fixText(key['name'],FLAG_DICT_CHARS)

#chamada Corrige Preço
fixPrice(data)

#chamada Corrige Quantidades
fixQuantity(data)

#recebendo todo conteudo do json corrigido
new_json = data

#escrevendo novo arquivo
writeNewFile(new_json,FLAG_FIX_DATABASE)

#abrindo arquivo corrigido
new = openFile(FLAG_FIX_DATABASE)

#chamada função calcula estoque
print(calcQuantity(new))

#chamada função ordernar por categoria e por id
orderList(new)
