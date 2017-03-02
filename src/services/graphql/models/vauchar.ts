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
      return {
        response
      }
      })
  }

  public createVoucherRedemption(voucherCode?: string, user_id?: number) {
    console.log(voucherCode)
    console.log(user_id)

    const filterVoucherByCodeURL = {
      method: 'GET',
      uri: `${vaucharBaseURL}/vouchers?voucher_code=${voucherCode}`,
      json: true,
      headers: {
        authorization: 'Basic Yjc3YzBjYWEtMjFmZi00NjA2LWI1N2ItOTE4NzI3NTIyNTFiOjI5ZDkwNDg2MThmZDFkZmJmNGFiMjUzYjg2MTU5ZGQx'
      },
    }

    let voucherRedemptionURL = {
      method: 'POST',
      uri: null,
      json: true,
      headers: {
        authorization: 'Basic Yjc3YzBjYWEtMjFmZi00NjA2LWI1N2ItOTE4NzI3NTIyNTFiOjI5ZDkwNDg2MThmZDFkZmJmNGFiMjUzYjg2MTU5ZGQx'
      },
      body: {
        user_id,
        value_used: "15.00"
      }
    }

// get voucher by filtering voucher code
    // then create voucher redemption using the voucher id
    return rp(filterVoucherByCodeURL)
      .then((response) => {
      console.log(response.data[0]);
      voucherRedemptionURL.uri = `${vaucharBaseURL}/vouchers/${response.data[0].id}/redemptions`
    }).then(() => {
      return rp(voucherRedemptionURL)
      })
      .then((redemptionResponse) => {
      console.log(redemptionResponse);
      return {
        response: redemptionResponse
      }
    })
      .catch((e) => {
      console.log(e);
      return e;
    })
  }

}
