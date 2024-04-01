import { Dispatch } from "redux"
import { appActions } from "app/app.reducer"
import { BaseResponseType } from "common/types/common.types"

/**
 * Обрабатчик ошибок с сервера.
 * @param {BaseResponseType<D>} data - Данные ответа от сервера типа `BaseResponseType<D>`, где `D` - тип данных ответа.
 * @param {Dispatch} dispatch - Функция диспетчера (dispatch), обычно используется в Redux или подобных библиотеках управления состоянием. Используется для отправки действий (actions) для обновления состояния приложения.
 * @param {boolean} isShowGlobalError - Флаг, указывающий, нужно ли отображать глобальную ошибку. По умолчанию установлено значение `true`.
 * @returns {void} - ничего
 */
export const handleServerAppError = <D>(
  data: BaseResponseType<D>,
  dispatch: Dispatch,
  isShowGlobalError: boolean = true,
): void => {
  if (isShowGlobalError) {
    if (data.messages.length) {
      dispatch(appActions.setAppError({ error: data.messages[0] }))
    } else {
      dispatch(appActions.setAppError({ error: "Some error occurred" }))
    }
  }
  dispatch(appActions.setAppStatus({ status: "failed" }))
}
