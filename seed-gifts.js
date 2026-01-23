import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(
  'https://ddpvriwtpgfvvvtfqzzw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRkcHZyaXd0cGdmdnZ2dGZxenp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxODQ5MDgsImV4cCI6MjA4NDc2MDkwOH0.qdouyivqKeWhBOv4LwwAT5pjMM84IrtNeftzJPuLjMs'
);

// imagem genérica (obrigatória pq image_url NÃO aceita null)
const PLACEHOLDER_IMAGE =
  null;

const gifts = [
  {
    name: 'TV Smart 32',
    description: 'Televisão smart ideal para entretenimento diário, com acesso a aplicativos e ótima qualidade de imagem.',
    purchase_link: 'https://www.magazineluiza.com.br/smart-tv-32-samsung-hd-32h5000f-tizen-2-hdmi/p/240145000/et/elit/?&seller_id=magazineluiza&utm_source=google&utm_medium=cpc&utm_term=83279&utm_campaign=google_eco_per_ven_pla_all_apo_1p_ed-ar-et-in-tb-ga-csp&utm_content=&partner_id=83279&gclsrc=aw.ds&gad_source=1&gad_campaignid=23350030547&gbraid=0AAAAAD4zZmTRuQKRnKYHCMsLhAN_U_W-5&gclid=EAIaIQobChMIkdasuYKbkgMVF15IAB1iXhvzEAQYAiABEgLexfD_BwE.',
  },
  {
    name: '3 travesseiros de corpo',
    description: 'Travesseiros de corpo confortáveis, ideais para melhorar a qualidade do sono.',
    purchase_link: 'https://www.amazon.com.br/Travesseiro-Corpo-Fronha-Algod%C3%A3o-Branco/dp/B086SFNBR6/ref=asc_df_B086SFNBR6?mcid=120620e9a5f13fb084c897826ab3dd5b&tag=googleshopp00-20&linkCode=df0&hvadid=709968340798&hvpos=&hvnetw=g&hvrand=15620633947846063765&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001707&hvtargid=pla-912816822142&psc=1&language=pt_BR&gad_source=1.',
  },
  {
    name: 'Fritadeira sem óleo',
    description: 'Fritadeira elétrica sem óleo para preparar alimentos de forma prática e saudável.',
    purchase_link: 'https://www.amazon.com.br/Fritadeira-Fryer-Digital-Mondial-Preto/dp/B0DJPHRWRM/ref=asc_df_B0DJPHRWRM?mcid=464806cd27e032008b41d01a822f2fbd&tag=googleshopp00-20&linkCode=df0&hvadid=733406297409&hvpos=&hvnetw=g&hvrand=482602941856474593&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001707&hvtargid=pla-2401774094570&language=pt_BR&gad_source=1&th=1',
  },
  {
    name: 'Panela de pressão elétrica',
    description: 'Panela de pressão elétrica moderna, segura e prática para o preparo diário das refeições.',
    purchase_link: 'https://www.midea.com.br/panela-de-pressao-eletrica-6-l-mastersteam-inox-midea/p?idsku=177&gad_source=1&gad_campaignid=17048781754&gbraid=0AAAAADBus9bshnZ6EDT4h5L3fW-hqAWen&gclid=EAIaIQobChMI8eLIpoWbkgMVKkVIAB02Ai4uEAQYBCABEgLK5fD_BwE',
  },
  {
    name: 'Panela de pressão',
    description: 'Panela de pressão tradicional, essencial para uma cozinha funcional.',
    purchase_link: 'https://www.amazon.com.br/Style-Panela-Press%C3%A3o-PressCook-Antiaderente/dp/B0F63YKC5P/ref=asc_df_B0F63YKC5P?mcid=f2cff88ee1d9320390e03b07a7fe045a&tag=googleshopp00-20&linkCode=df0&hvadid=773067503959&hvpos=&hvnetw=g&hvrand=17873152191881737751&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001707&hvtargid=pla-2449373686762&language=pt_BR&gad_source=1&th=1',
  },
  {
    name: 'Frigideira',
    description: 'Frigideira versátil para o preparo de diversos pratos no dia a dia.',
    purchase_link: 'https://www.polishop.com.br/panela-saute-grand-24cm-polishop/p?idsku=107849&utm_source=google&utm_source=google&utm_medium=cpc&utm_campaign=%5BAtivacao%5D+%5BWinners%5D+%5BConversoes%5D+%5BSHOPPING%5D&gad_source=1&gad_campaignid=21849911641&gbraid=0AAAAADGsd3tXsToeCxXt_0NeyKLNc2Kvl&gclid=EAIaIQobChMIn7H4zIabkgMVSlRIAB0aWy4uEAQYASABEgKMgfD_BwE',
  },
  {
    name: 'Kit Almofadas',
    description: 'Conjunto de almofadas decorativas para trazer conforto e estilo ao ambiente.',
    purchase_link: 'https://cazinha.com.br/products/kit-4-almofadas-cheias-em-suede-drapeada-45x45cm-decorativas-conforto-e-estilo-para-sua-sala-ou-quarto?variant=50567490208034',
  },
  {
    name: 'Jogo toalha de banho',
    description: 'Jogo de toalhas de banho macias e elegantes para o uso diário.',
    purchase_link: 'https://www.casabergan.com.br/produto/jogo-de-toalhas-de-banho-karsten-lumina-fio-penteado-gramatura-500g-m-5-pecas-150228?utm_source=google&utm_medium=cpc&utm_campaign=eo_vendas_pmax_karsten_2_aberto&utm_source=google&utm_medium=cpc&utm_campaign=23378398046&utm_content=&utm_term=&utm_matchtype=&utm_device=c&utm_targetid=&gad_source=1&gad_campaignid=23378408618&gbraid=0AAAAACeEzoBeko2AOQ3npxUuwD9lIiFIE&gclid=EAIaIQobChMI69_ur4ebkgMVEV9IAB23xwoYEAQYAiABEgKrhvD_BwE',
  },
  {
    name: 'Jogo de Lençol',
    description: 'Jogo de lençóis confortável e sofisticado para o quarto.',
    purchase_link: 'https://www.ambordados.com.br/kit-coodernado-casalqueen-athenas-marinho-cobre-leito-queen-jogo-de-cama-4-pc-07-pecas/p?gad_source=1&gad_campaignid=20943117550&gbraid=0AAAAAos6Xuqjfo2nO4S89t8_LYnNb01AX&gclid=EAIaIQobChMI0fen5oebkgMVY2tIAB3pIwMAEAQYBSABEgIAfvD_BwE.',
  },
  {
    name: 'Tapete',
    description: 'Tapete decorativo ideal para deixar o ambiente mais aconchegante.',
    purchase_link: 'https://www.amazon.com.br/Algod%C3%A3o-Antiderrapante-Minimalista-R%C3%BAstico-Moderno/dp/B0DWXX68CL/ref=asc_df_B0DWXX68CL?mcid=9129f78b0bb43de2803ae9a581733211&tag=googleshopp00-20&linkCode=df0&hvadid=733521303965&hvpos=&hvnetw=g&hvrand=10173739787879030359&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001707&hvtargid=pla-2405395325438&language=pt_BR&gad_source=1&th=1',
  },
  {
    name: 'Kit Vinho',
    description: 'Kit para vinho com acessórios essenciais para apreciadores.',
    purchase_link: 'https://www.amazon.com.br/WineWiz-Autom%C3%A1tico-Recarreg%C3%A1vel-Acess%C3%B3rios-Armazenamento/dp/B0D8WLVVJS/ref=asc_df_B0D8WLVVJS?mcid=de20975c384f3ff2b910c11d07815091&tag=googleshopp00-20&linkCode=df0&hvadid=709876289439&hvpos=&hvnetw=g&hvrand=12399178831082551545&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001707&hvtargid=pla-2325671614281&psc=1&language=pt_BR&gad_source=1',
  },
  {
    name: 'Porta Mantimentos',
    description: 'Conjunto de porta mantimentos para organizar a cozinha.',
    purchase_link: 'https://www.amazon.com.br/Mantimentos-Herm%C3%A9ticos-Silicone-Premium-Madeira/dp/B0DWPSMN9R/ref=asc_df_B0DWPSMN9R?mcid=9d9a4b81cecb3cedbebc6ca6f25e96f9&tag=googleshopp00-20&linkCode=df0&hvadid=742212429005&hvpos=&hvnetw=g&hvrand=12399178831082551545&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001707&hvtargid=pla-2420295483073&language=pt_BR&gad_source=1&th=1',
  },
  {
    name: 'Kit café da manhã',
    description: 'Kit completo para servir café da manhã com charme.',
    purchase_link: 'https://www.amazon.com.br/Kit-Caf%C3%A9-Manh%C3%A3-Bambu-Itens/dp/B0FJP5MH59/ref=asc_df_B0FJP5MH59?mcid=5ff4fdd4ae553fc593a3bb3da3173d2f&tag=googleshopp00-20&linkCode=df0&hvadid=709878548112&hvpos=&hvnetw=g&hvrand=12399178831082551545&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001707&hvtargid=pla-2440039559646&psc=1&language=pt_BR&gad_source=1',
  },
  {
    name: 'Porta Pão',
    description: 'Porta pão prático para conservar pães frescos.',
    purchase_link: 'https://www.amazon.com.br/Porta-P%C3%A3o-Al%C3%A7as-Linha-Sense/dp/B0CLHM7QFT/ref=asc_df_B0CLHM7QFT?mcid=8f32cf1b7def3d28a014ef4d1118f144&tag=googleshopp00-20&linkCode=df0&hvadid=709964506304&hvpos=&hvnetw=g&hvrand=12399178831082551545&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001707&hvtargid=pla-2265989204135&psc=1&language=pt_BR&gad_source=1',
  },
  {
    name: 'Kit Lavabo',
    description: 'Kit lavabo decorativo para deixar o banheiro elegante.',
    purchase_link: 'https://www.amazon.com.br/Aromatizador-Saboneteira-Decorativo-Luxuosas-Decoradas/dp/B0CKFJDM5L/ref=asc_df_B0CKFJDM5L?mcid=a2ca30a825573864b092b9afb23bdfc5&tag=googleshopp00-20&linkCode=df0&hvadid=709968341275&hvpos=&hvnetw=g&hvrand=7721819906546909477&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001707&hvtargid=pla-2298102160954&psc=1&language=pt_BR&gad_source=1',
  },
  {
    name: 'Lixeira com sensor',
    description: 'Lixeira automática com sensor para mais higiene e praticidade.',
    purchase_link: 'https://www.amazon.com.br/Lixeira-litros-autom%C3%A1tica-inteligente-aproxima%C3%A7%C3%A3o/dp/B0CLDGBYGL?th=1',
  },
  {
    name: 'Lixeira',
    description: 'Lixeira moderna e funcional para o dia a dia.',
    purchase_link: 'https://www.amazon.com.br/Lixeira-com-Sensor-Autom%C3%A1tico-Preta/dp/B0FC45B9L7?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&psc=1&smid=A1FPE9JD1DDLQL',
  },
  {
    name: 'Organizador de Maquiagem',
    description: 'Organizador prático para maquiagem e cosméticos.',
    purchase_link: 'https://www.amazon.com.br/Gen%C3%A9rico-AC-240225-Organizador-Maquiagem-Cosm%C3%A9ticos/dp/B0FJSBKKCV/ref=asc_df_B0FJSBKKCV?mcid=5d8905f78b953303aee5d0af6884242c&tag=googleshopp00-20&linkCode=df0&hvadid=709963977587&hvpos=&hvnetw=g&hvrand=11409233542032234404&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001707&hvtargid=pla-2443100533595&psc=1&language=pt_BR&gad_source=1',
  },
  {
    name: 'Dspenser de Grãos',
    description: 'Dispenser giratório para armazenar grãos com praticidade.',
    purchase_link: 'https://shopee.com.br/Dispenser-de-Cereais-6-em-1-Girat%C3%B3rio-360%C2%B0-Organizador-de-Gr%C3%A3os-para-Cozinha-Arroz-Feij%C3%A3o-i.1686306358.22499217063',
  },
  {
    name: 'Kit Organizador Geladeira',
    description: 'Kit organizador para geladeira, ideal para manter tudo em ordem.',
    purchase_link: 'https://shopee.com.br/product/251229295/22393818670?gads_t_sig=VTJGc2RHVmtYMTlxTFVSVVRrdENkVHQ3ZkZSUTMrR3pBWmZZNzdrcnRBMlpQVDJRMWtEbTUxUDVic0NQTjhLSXl2L3I2WkNYeG43ak1OcGxkb2s4cUxiWU05OUdCSTNqL3E5K1NaN2FjV0pxQjVReGNnU3ZNZ0ZjUlpMSGxpbkdYSUtQZy9WMTZINW9mZ1V5VWFWVGlnPT0&gad_source=1&gad_campaignid=23353217471&gbraid=0AAAAACoEtRl6zI20q7i2AtI6tmzXKzhcB&gclid=EAIaIQobChMI5aiXtoybkgMVelVIAB1nGBQyEAQYBCABEgIHkfD_BwE',
  },
  {
    name: 'Grill giratório',
    description: 'Grill giratório ideal para churrascos e assados.',
    purchase_link: 'https://www.amazon.com.br/Grill-Giratorio-Churrasqueira-Espetos-Bivolt/dp/B0851JFHTF/ref=asc_df_B0851JFHTF?mcid=fc63e1bad05e3d25ae98770f807d5f33&tag=googleshopp00-20&linkCode=df0&hvadid=709885039582&hvpos=&hvnetw=g&hvrand=4858808941959940307&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001707&hvtargid=pla-931959241354&psc=1&language=pt_BR&gad_source=1',
  },
  {
    name: 'Ar condicionado portátil',
    description: 'Ar condicionado portátil para refrescar ambientes com mobilidade.',
    purchase_link: 'https://www.amazon.com.br/Ar-Condicionado-Port%C3%A1til-Philco-PAC12000F5-Protect/dp/B0BBJR7Q5V/ref=asc_df_B0BBJR7Q5V?mcid=c59097e2e7c732e9896b338c0c4d416e&tag=googleshopp00-20&linkCode=df0&hvadid=709968341215&hvpos=&hvnetw=g&hvrand=4378440880103422037&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1001707&hvtargid=pla-1967117399442&language=pt_BR&gad_source=1&th=1',
  }
].map(gift => ({
  ...gift,
  image_url: PLACEHOLDER_IMAGE,
  status: 'available'
}));

async function seed() {
  const { error } = await supabase.from('gifts').insert(gifts);
  if (error) {
    console.error('❌ Erro ao inserir presentes:', error);
  } else {
    console.log('✅ Presentes inseridos com sucesso!');
  }
}

seed();
