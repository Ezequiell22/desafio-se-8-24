import { verifyBaererAuth } from '../../utils/validations/Validation';
import {
  msgGetSuccess,
  msgGetError
} from '../../utils/message/responseRest';

const TYPE = 'score'

export const calcScore = (debt, Mgoods ) => {

    let score = 0
    let fDebt = parseFloat(debt)
    let fMgoods = parseFloat(Mgoods)

    //total igual a 100%
    let valorTotal = fDebt + fMgoods
    
    //score inicial
    if (valorTotal == 0) 
    {
        score = 1000
        return Math.round(score)
    }

    //porcetagem do debito no valor total
    const porcentagemDebt = ( ( fDebt / valorTotal ) * 100)  

    //porcentagem dos bens materiais sobre o valor total
    const porcentagemMGoods = ( ( fMgoods / valorTotal ) * 100)  

    score = ( porcentagemMGoods ) * 10

    return Math.round(score)

}

export const getScore = async (cpf, token, db) => {

    //total de 0 - 1000
    let resp = await verifyBaererAuth(token, db);
    let user_id = ''; 
    let totDebt = 0;
    let totMaterialGoods = 0;

    if (!resp.success ) return resp;

    if (!resp.data.role == 1) {
        //o usuario comum so pode consultar seu proprio score
        cpf = resp.data.cpf
    }

    try{

    //pega id do user
    await db('user')
        .select( 'user.id')
        .where('cpf', cpf)
        .limit(1)
        .then((response) => {
           
            if(response){
                user_id = response[0].id
            }
         
        })

        if ( !user_id ) return msgGetError(TYPE, 'not user in this cpf', 404);

        //pegar dividas
        await db('debt')
        .select( 'debt.value')
        .where('id_user', user_id)
        .then((response) => {

            if(response  && response.length > 0){
                if(response && response.length > 0){
                
                    for (let index = 0; index < response.length; index++) {
                        const element = response[index];
                        totDebt = parseFloat(totDebt) + parseFloat(element.value)
                    }
                }
            }
         
        })

        //pegar bens materiais
        await db('material_goods')
        .select( 'material_goods.value')
        .where('id_user', user_id)
        .then((response) => {

            if(response && response.length > 0){
                
                for (let index = 0; index < response.length; index++) {
                    const element = response[index];
                    totMaterialGoods = parseFloat(totMaterialGoods) + parseFloat(element.value)
                }
            }
         
        })


        let score = calcScore(totDebt, totMaterialGoods)

        resp = msgGetSuccess(TYPE, {
            "Total de bens" : `R$ ${totMaterialGoods.toFixed(2)}` ,
            "Total de dívidas" : `R$ ${totDebt.toFixed(2)}`,
            "Seu Score atual" : `${score} pontos` 
        }, 200);

    }catch(e){
        resp = msgGetError(TYPE, e, 404)
    }

    return resp;
  };