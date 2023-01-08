export interface InputOutputPath {
  inputPath: string,
  outputPath: string
}

const headers = [
  'N.laukas',          'PAYMENT_ID',        'STATUS',
  'SYNCED',            'DOCTYPE',           'BUSINESSAREA',
  'PRIORITY',          'AMOUNT',            'CURRENCY',
  'BALANCEDATE',       'PAYER_BIC',         'PAYER_ACCOUNT',
  'PAYER_TYPE',        'PAYER_CODE_TYPE',   'PAYER_CODE_ISSR',
  'PAYER_CODE',        'PAYER_NAME',        'PAYER_CTRY',
  'PAYER_ADRLINE1',    'PAYER_ADRLINE2',    'PAYER_BIRTHDT',
  'PAYER_PRVCOFBIRTH', 'PAYER_CITYOFBIRTH', 'PAYER_CTRYOFBIRTH',
  'OP_ACCOUNT',        'OP_TYPE',           'OP_CODE_ISSR',
  'OP_CODE_TYPE',      'OP_CODE',           'OP_NAME',
  'OP_BIRTHDT',        'OP_PRVCOFBIRTH',    'OP_CITYOFBIRTH',
  'OP_CTRYOFBIRTH',    'PAYEE_BIC',         'PAYEE_ACCOUNT',
  'PAYEE_TYPE',        'PAYEE_CODE_TYPE',   'PAYEE_CODE',
  'PAYEE_CODE_ISSR',   'PAYEE_NAME',        'PAYEE_MEMBERCODE',
  'PAYEE_CTRY',        'PAYEE_ADRLINE1',    'PAYEE_ADRLINE2',
  'PAYEE_BIRTHDT',     'PAYEE_PRVCOFBIRTH', 'PAYEE_CITYOFBIRTH',
  'PAYEE_CTRYOFBIRTH', 'BP_ACCOUNT',        'BP_TYPE',
  'BP_CODE_TYPE',      'BP_CODE',           'BP_CODE_ISSR',
  'BP_NAME',           'BP_BIRTHDT',        'BP_PRVCOFBIRTH',
  'BP_CITYOFBIRTH',    'BP_CTRYOFBIRTH',    'PURPOSE_CODE',
  'PAYMENTCODE',       'REFINF_ISSR',       'DOCDATE',
  'ID',                'PAYAT',             'PAYMENTREASON',
  'INSTGAGT',          'ERRORTEXT',         'U_ID',
  'INSTRID',           'TXID',              'REASON CODE',
  'REASON PRTRY',      'ORIGINATOR BIC',    'ORIGINATOR NAME',
  'CHARGES AMOUNT',    'CREATOR_ID'
] as const

export type Headers = typeof headers[number];

export interface PayerObject {
  [index: string]: Headers
}

export type FCondition = (_condition: Function) => void

export interface PayerFields {
  'N.laukas': string;          'PAYMENT_ID': string,        'STATUS': string,
  'SYNCED': string;            'DOCTYPE': string,           'BUSINESSAREA': string,
  'PRIORITY': number;          'AMOUNT': number,            'CURRENCY': string,
  'BALANCEDATE': number,       'PAYER_BIC': string,         'PAYER_ACCOUNT': string,
  'PAYER_TYPE': string,        'PAYER_CODE_TYPE': string,   'PAYER_CODE_ISSR': string,
  'PAYER_CODE': number,        'PAYER_NAME': string,        'PAYER_CTRY': string,
  'PAYER_ADRLINE1': string,    'PAYER_ADRLINE2': string,    'PAYER_BIRTHDT': string,
  'PAYER_PRVCOFBIRTH': string, 'PAYER_CITYOFBIRTH': string, 'PAYER_CTRYOFBIRTH': string,
  'OP_ACCOUNT': string,        'OP_TYPE': string,           'OP_CODE_ISSR': string,
  'OP_CODE_TYPE': string,      'OP_CODE': string,           'OP_NAME': string,
  'OP_BIRTHDT': string,        'OP_PRVCOFBIRTH': string,    'OP_CITYOFBIRTH': string,
  'OP_CTRYOFBIRTH': string,    'PAYEE_BIC': string,         'PAYEE_ACCOUNT': string,
  'PAYEE_TYPE': string,        'PAYEE_CODE_TYPE': string,   'PAYEE_CODE': string,
  'PAYEE_CODE_ISSR': string,   'PAYEE_NAME': string,        'PAYEE_MEMBERCODE': string,
  'PAYEE_CTRY': string,        'PAYEE_ADRLINE1': string,    'PAYEE_ADRLINE2': string,
  'PAYEE_BIRTHDT': string,     'PAYEE_PRVCOFBIRTH': string, 'PAYEE_CITYOFBIRTH': string,
  'PAYEE_CTRYOFBIRTH': string, 'BP_ACCOUNT': string,        'BP_TYPE': string,
  'BP_CODE_TYPE': string,      'BP_CODE': string,           'BP_CODE_ISSR': string,
  'BP_NAME': string,           'BP_BIRTHDT': string,        'BP_PRVCOFBIRTH': string,
  'BP_CITYOFBIRTH': string,    'BP_CTRYOFBIRTH': string,    'PURPOSE_CODE': string,
  'PAYMENTCODE': string,       'REFINF_ISSR': string,       'DOCDATE': string,
  'ID': string,                'PAYAT': string,             'PAYMENTREASON': string,
  'INSTGAGT': string,          'ERRORTEXT': string,         'U_ID': string,
  'INSTRID': string,           'TXID': string,              'REASON CODE': string,
  'REASON PRTRY': string,      'ORIGINATOR BIC': string,    'ORIGINATOR NAME': string,
  'CHARGES AMOUNT': string,    'CREATOR_ID': number
}

export type PayerField = number | string | [key: string];

export type ExportOption = 'original' | 'transform';