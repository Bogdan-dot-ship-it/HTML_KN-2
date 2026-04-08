export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.consent) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Ви повинні погодитись з умовами використання.'
    })
  }

  console.log('Дані оплати отримано:', body)

  return {
    success: true,
    message: 'Підписку успішно оформлено! Тріал розпочато.',
    orderId: 'ORD-' + Math.floor(Math.random() * 1000000)
  }
})
