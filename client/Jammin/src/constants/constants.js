export const API_URL = import.meta.env.PROD
  ? 'https://jammin-api-5qbt.onrender.com/api'
  : 'http://localhost:1337/api'

export const API_TOKEN = import.meta.env.PROD
  ? 'e6a6d1c09420ea44f67ffc2c476f51c4689b350f8daa59c5540ccef141e5c67a3286d44924ea9a130896943b8e7d8b176887520405bc1f198d9e0747bbe3ab1185de61416d3475cab96e2e7b29c6b8ffe3fcd777293cec85572ff8348be5b065385d6c26dffbde7580716cee3c96ca2d7377ddb5d0535a0a378f230dc2adbf98'
  : '4360ba5684a2a1c98e6450f5927c6ba1e82e5fe24733d7faa1414870f5cbf74f9ed81c8538b4bd41b58a276828828725b1da62a37fb2b97f7468519b4a483075575f83c0e236ed5fe3b686037d7208fa17d06ad810fd8a663cb7eae4443ef7a34b4bc60aa280dbdb152a56cd16326967becd9ad81b0e993217d38740f0c3b9ad'

export const PAGE_SIZE_OPTIONS = [1, 2, 5, 10, 20, 50]
