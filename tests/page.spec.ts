import { expect, test } from '@playwright/test'

test.use({ colorScheme: 'dark' })
test.beforeEach(async ({ page }) => await page.goto('/'))

test('searches for words using the input field', async ({ page }) => {
  const input = page.getByRole('searchbox')

  await input.fill('keyboard')
  await input.press('Enter')

  await expect(page.getByRole('heading', { name: 'keyboard' })).toBeVisible()
})

test('displays an error when it do not find the word', async ({ page }) => {
  const input = page.getByRole('searchbox')

  await input.fill('brnach')
  await input.press('Enter')

  await expect(
    page.getByRole('heading', { name: 'No Definitions Found' })
  ).toBeVisible()
})

test('displays an error message when trying to submit the blank field', async ({
  page
}) => {
  await page.getByRole('searchbox').press('Enter')

  await expect(page.getByText('Whoops, can’t be empty…')).toBeVisible()
})

test('switches between serif, sans serif, and monospace fonts', async ({
  page
}) => {
  const body = page.locator('body')

  await page.getByRole('button', { name: 'Sans Serif' }).click()

  await expect(page.getByRole('dialog')).toBeVisible()

  await page.getByText('Serif', { exact: true }).click()

  await expect(page.getByRole('dialog')).not.toBeVisible()
  await expect(body).toHaveClass('font-serif')

  await page.getByRole('button', { name: 'Serif' }).click()
  await page.getByText('Mono').click()

  await expect(body).toHaveClass('font-mono')

  await page.getByRole('button', { name: 'Mono' }).click()
  await page.getByText('Sans Serif').click()

  await expect(body).toHaveClass('font-sans')
})
