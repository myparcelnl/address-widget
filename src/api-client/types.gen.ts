// This file is auto-generated by @hey-api/openapi-ts

/**
 * ISO 3166-1 alpha-2 code.
 */
export type Alpha2CountryCode = 'AD' | 'AE' | 'AF' | 'AG' | 'AI' | 'AL' | 'AM' | 'AO' | 'AQ' | 'AR' | 'AS' | 'AT' | 'AU' | 'AW' | 'AX' | 'AZ' | 'BA' | 'BB' | 'BD' | 'BE' | 'BF' | 'BG' | 'BH' | 'BI' | 'BJ' | 'BL' | 'BM' | 'BN' | 'BO' | 'BQ' | 'BR' | 'BS' | 'BT' | 'BV' | 'BW' | 'BY' | 'BZ' | 'CA' | 'CC' | 'CD' | 'CF' | 'CG' | 'CH' | 'CI' | 'CK' | 'CL' | 'CM' | 'CN' | 'CO' | 'CR' | 'CU' | 'CV' | 'CW' | 'CX' | 'CY' | 'CZ' | 'DE' | 'DJ' | 'DK' | 'DM' | 'DO' | 'DZ' | 'EC' | 'EE' | 'EG' | 'EH' | 'ER' | 'ES' | 'ET' | 'FI' | 'FJ' | 'FK' | 'FM' | 'FO' | 'FR' | 'GA' | 'GB' | 'GD' | 'GE' | 'GF' | 'GG' | 'GH' | 'GI' | 'GL' | 'GM' | 'GN' | 'GP' | 'GQ' | 'GR' | 'GS' | 'GT' | 'GU' | 'GW' | 'GY' | 'HK' | 'HM' | 'HN' | 'HR' | 'HT' | 'HU' | 'ID' | 'IE' | 'IL' | 'IM' | 'IN' | 'IO' | 'IQ' | 'IR' | 'IS' | 'IT' | 'JE' | 'JM' | 'JO' | 'JP' | 'KE' | 'KG' | 'KH' | 'KI' | 'KM' | 'KN' | 'KP' | 'KR' | 'KW' | 'KY' | 'KZ' | 'LA' | 'LB' | 'LC' | 'LI' | 'LK' | 'LR' | 'LS' | 'LT' | 'LU' | 'LV' | 'LY' | 'MA' | 'MC' | 'MD' | 'ME' | 'MF' | 'MG' | 'MH' | 'MK' | 'ML' | 'MM' | 'MN' | 'MO' | 'MP' | 'MQ' | 'MR' | 'MS' | 'MT' | 'MU' | 'MV' | 'MW' | 'MX' | 'MY' | 'MZ' | 'NA' | 'NC' | 'NE' | 'NF' | 'NG' | 'NI' | 'NL' | 'NO' | 'NP' | 'NR' | 'NU' | 'NZ' | 'OM' | 'PA' | 'PE' | 'PF' | 'PG' | 'PH' | 'PK' | 'PL' | 'PM' | 'PN' | 'PR' | 'PS' | 'PT' | 'PW' | 'PY' | 'QA' | 'RE' | 'RO' | 'RS' | 'RU' | 'RW' | 'SA' | 'SB' | 'SC' | 'SD' | 'SE' | 'SG' | 'SH' | 'SI' | 'SJ' | 'SK' | 'SL' | 'SM' | 'SN' | 'SO' | 'SR' | 'SS' | 'ST' | 'SV' | 'SX' | 'SY' | 'SZ' | 'TC' | 'TD' | 'TF' | 'TG' | 'TH' | 'TJ' | 'TK' | 'TL' | 'TM' | 'TN' | 'TO' | 'TR' | 'TT' | 'TV' | 'TW' | 'TZ' | 'UA' | 'UG' | 'UM' | 'US' | 'UY' | 'UZ' | 'VA' | 'VC' | 'VE' | 'VG' | 'VI' | 'VN' | 'VU' | 'WF' | 'WS' | 'XK' | 'YE' | 'YT' | 'ZA' | 'ZM' | 'ZW';

export type Address = {
    /**
     * City name.
     */
    city: string;
    countryCode: Alpha2CountryCode;
    /**
     * House number.
     */
    houseNumber: string;
    /**
     * House number suffix.
     */
    houseNumberSuffix?: string;
    /**
     * Whether the address is a post office box.
     */
    postOfficeBox: boolean;
    /**
     * Postal code.
     */
    postalCode: string;
    /**
     * Street name.
     */
    street: string;
    /**
     * Geodetic latitude.
     */
    latitude?: number;
    /**
     * Geodetic longitude.
     */
    longitude?: number;
    /**
     * Municipality name.
     */
    municipality?: string;
};

export type ProblemDetails = {
    /**
     * A URI reference that identifies the problem type.
     */
    type: 'about:blank' | 'urn:problem:conflict' | 'urn:problem:not-found' | 'urn:problem:server' | 'urn:problem:unsupported-media-type' | 'urn:problem:validation-error';
    /**
     * The HTTP status code generated by the origin server.
     */
    status: 200 | 400 | 401 | 403 | 404 | 409 | 415 | 500;
    /**
     * A short human-readable summary of the problem type.
     */
    title: string;
    /**
     * A human-readable explanation specific to this occurrence of the problem.
     */
    detail: string;
    /**
     * A URI reference that identifies the specific occurrence of the problem.
     */
    instance: string;
    /**
     * The cause of this problem when debug mode is enabled.
     */
    cause?: {};
};

export type ProblemDetailsBadRequest = ProblemDetails & {
    /**
     * A URI reference that identifies the problem type.
     */
    type?: 'urn:problem:validation-error';
    /**
     * The HTTP status code generated by the origin server.
     */
    status?: 400;
    /**
     * Detailed information regarding the violations.
     */
    errors?: Array<{
        detail: string;
        pointer: string;
    }>;
};

export type Validate = {
    valid: boolean;
};

export type GetAddressesData = {
    body?: never;
    path?: never;
    query?: {
        /**
         * ISO 3166-1 alpha-2 code to search for an address.
         */
        countryCode?: Alpha2CountryCode & unknown;
        /**
         * House number to search for an address. Can only be used when `countryCode`=`NL`. Otherwise ignored.
         */
        houseNumber?: string;
        /**
         * House number suffix to search for an address. Can only be used when `countryCode`=`NL`. Otherwise ignored.
         */
        houseNumberSuffix?: string;
        /**
         * Postal code to search for an address. Can only be used when `countryCode`=`NL`. Otherwise ignored.
         */
        postalCode?: string;
        /**
         * Query string to search for an address. Must be used when `houseNumber` and `postalCode` are not used.
         */
        query?: string;
        /**
         * Limit the number of addresses to respond. Can only be used when `countryCode`=`NL`. Otherwise ignored.
         */
        limit?: number;
    };
    url: '/addresses';
};

export type GetAddressesErrors = {
    /**
     * Validation error.
     */
    400: ProblemDetailsBadRequest;
};

export type GetAddressesError = GetAddressesErrors[keyof GetAddressesErrors];

export type GetAddressesResponses = {
    /**
     * Found addresses.
     */
    200: {
        /**
         * When `countryCode`=`NL` and there is no house number suffix supplied then the result will be all the addresses under that house number, and currently that is under 300. For other countries the result is limited to the default 5 or the specified limit.
         */
        results: Array<Address>;
    };
};

export type GetAddressesResponse = GetAddressesResponses[keyof GetAddressesResponses];

export type GetValidateData = {
    body?: never;
    path?: never;
    query: {
        /**
         * ISO 3166-1 alpha-2 code to validate an address with.
         */
        countryCode: Alpha2CountryCode & unknown;
        /**
         * Postal code to validate an address with.
         */
        postalCode: string;
        /**
         * City to validate an address with. For dutch addresses this is not validated.
         */
        city?: string;
        /**
         * House number to validate an address with. For dutch addresses this is mandatory.
         */
        houseNumber?: string;
        /**
         * House number suffix to validate an address with. For dutch addresses this could be mandatory to identify an apartment.
         */
        houseNumberSuffix?: string;
        /**
         * Region to validate an address with. For dutch addresses this is not validated.
         */
        region?: string;
        /**
         * Street to validate an address with. For dutch addresses this is not validated.
         */
        street?: string;
        /**
         * When used it only validates the format of the address. Otherwise its existence is also validated.
         */
        validationType?: 'FORMAT';
    };
    url: '/validate';
};

export type GetValidateErrors = {
    /**
     * Validation error.
     */
    400: ProblemDetailsBadRequest;
};

export type GetValidateError = GetValidateErrors[keyof GetValidateErrors];

export type GetValidateResponses = {
    /**
     * Valid address whether or not.
     */
    200: Validate;
};

export type GetValidateResponse = GetValidateResponses[keyof GetValidateResponses];