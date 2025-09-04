// Lista de palavras em português de 5 letras
export const WORDS_5_LETTERS = [
  'ABRIR', 'AMIGO', 'BAILE', 'ANIMA', 'APOIO', 'AROMA', 'ATIVO', 'AUDIO', 'AUTOR',
  'BANCO', 'BARCO', 'ETICA', 'CINTO', 'BICHO', 'BOCAL', 'BORDA', 'BRASA', 'BRUTO',
  'CASAL', 'CAUSA', 'CHAVE', 'CHUVA', 'CINCO', 'CLIMA', 'COBRA', 'CORPO', 'CULPA',
  'DADOS', 'DENTE', 'DICAS', 'DIGNO', 'DIVAS', 'DOBRA', 'DORME', 'DUPLO', 'DURAR',
  'EDUCA', 'ELEVA', 'TORSO', 'ENVIA', 'EPOCA', 'ERROU', 'ESTAR', 'ETAPA', 'EXATO',
  'FALTA', 'FAROL', 'FATAL', 'FELIZ', 'FESTA', 'FICHA', 'FOLHA', 'FORCA', 'FURTO',
  'GENTE', 'GOLPE', 'GRAVE', 'GRITO', 'GRUPO', 'EPICO', 'GUSTO', 'GALHO', 'GARRA',
  'HABIL', 'HONRA', 'HOTEL', 'HUMOR', 'HORAS', 'HOMEM', 'HISTO', 'HORTA', 'HASTE',
  'IDEIA', 'IGUAL', 'LEQUE', 'IMPAR', 'PESCA', 'INVES', 'IRADO', 'ISOLO', 'ITENS',
  'JOGAR', 'JOVEM', 'JUDAS', 'JUNTO', 'JURAR', 'JUSTO', 'COESO', 'JARRO', 'JULGO',
  'LARGO', 'LEGAL', 'LEITE', 'LETRA', 'POETA', 'LONGE', 'LUGAR', 'LUTAR', 'ROCHA',
  'MAGIA', 'MAIOR', 'MALHA', 'MANTA', 'MARCO', 'VENTO', 'MEDIA', 'MENOR', 'MUNDO',
  'TRAVE', 'NATAL', 'LENDA', 'NIVEL', 'NOIVO', 'NUNCA', 'MOEDA', 'MISTO', 'NEGAR',
  'FAIXA', 'LIVRO', 'OLHAR', 'TOURO', 'OPERA', 'ORDEM', 'LENHA', 'OUVIR', 'OUTRO',
  'PAPEL', 'PARAR', 'PEDRA', 'PEGAR', 'PENSA', 'PESAR', 'PILHA', 'PODER', 'PULSO',
  'QUASE', 'PALHA', 'QUERO', 'PALMO', 'CORES', 'SUTIL', 'QUEDA', 'PENAS', 'QUILO',
  'RADIO', 'RAPAZ', 'PRATO', 'RATIO', 'COLHE', 'REGRA', 'RENDA', 'RIGOR', 'RITMO',
  'SABER', 'SALDO', 'SENHA', 'SERIA', 'SIGNO', 'SILVA', 'SINTO', 'SOMAR', 'SUAVE',
  'TARDE', 'TECLA', 'TEMPO', 'TERRA', 'TEXTO', 'TIGRE', 'TINTA', 'TOCAR', 'TURMA',
  'UNIDO', 'URGIR', 'UNICO', 'PORCO', 'TROCO', 'ARARA', 'UNIAO', 'GRILO', 'USADO',
  'VALOR', 'REVEZ', 'VELHO', 'VENDA', 'VERDE', 'VIDAS', 'VINHO', 'VIRAR', 'VISTA',
  'ANEXO', 'GARFO', 'BANHO', 'VESTE', 'ZINCO', 'ZONAL', 'ZUMBI', 'ZEBRA', 'ZELAR'
];

// Lista de palavras válidas para validação (inclui as palavras do jogo + outras válidas)
export const VALID_WORDS = [
  ...WORDS_5_LETTERS,
  // Adicionar mais palavras válidas aqui se necessário
  'ARDIL', 'ETNIA', 'ARDEI', 'INVIA', 'SAGAZ', 'NOBRE', 'POLVO', 'PLANO', 'OLHOS',
  'AREIA', 'GAMBA', 'PERNA', 'PONTE', 'CILIO', 'TRIGO', 'CAIXA', 'ROUPA', 'VEZES',
  'MOITA', 'PORTA', 'SAUDE', 'GOSMA', 'GOSTO', 'GESTO', 'JEITO', 'TRONO', 'CESTA', 
  'SITIO', 'CURSO', 'RINHA', 'PERNA', 'FAROL', 'TRONO', 'TRONO', 'GRILO', 'TERNO'
];

export const getRandomWord = (): string => {
  return WORDS_5_LETTERS[Math.floor(Math.random() * WORDS_5_LETTERS.length)];
};

export const isValidWord = (word: string): boolean => {
  return VALID_WORDS.includes(word.toUpperCase());
};
