/**
 * Created by Sif on 3/2/17.
 */
import * as rp from 'request-promise';
const vaucharBaseURL = 'https://api.vauchar.com'

export default class Voucher {

  public validateVoucherCode(voucherCode?: string) {
    console.log(voucherCode)
    const voucherValidationURL = {
      method: 'GET',
      uri: `${vaucharBaseURL}/vouchers/validate?voucher_code=${voucherCode}`,
      json: true,
      headers: {
        authorization: 'Basic Yjc3YzBjYWEtMjFmZi00NjA2LWI1N2ItOTE4NzI3NTIyNTFiOjI5ZDkwNDg2MThmZDFkZmJmNGFiMjUzYjg2MTU5ZGQx'
      },
    }
    console.log(voucherValidationURL.uri)

    return rp(voucherValidationURL)
      .then((response) => {
      console.log(response);
      return {
        response
      }
      })

  }
}
