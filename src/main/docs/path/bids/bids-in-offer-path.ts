export const BidsInOfferPath = {
  get: {
    tags: ['Bids'],
    summary: 'Rota para obtenção dos lances cadastrados em uma determinada oferta',
    parameters: [
      {
        in: 'path',
        name: 'offerId',
        schema: {
          type: 'integer'
        },
        required: 'true',
        description: 'Id da oferta que deseja obter o lances cadastrados'
      }
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/bidsGetResponseBody'
            }
          }
        }
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
