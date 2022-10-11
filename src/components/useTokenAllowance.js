// import {useCall} from '@usedapp/core'



// function useTokenAllowance(
//     tokenAddress,
//     ownerAddress,
//     spenderAddress
//   ) {
//     const { value, error } =
//       useCall(
//         ownerAddress &&
//           spenderAddress &&
//           tokenAddress && {
//             contract: new Contract(tokenAddress, ERC20Interface),
//             method: 'allowance',
//             args: [ownerAddress, spenderAddress],
//           }
//       ) ?? {}
//     if(error) {
//       console.error(error.message)
//       return undefined
//     }
//     return value?.[0]
//   }

// export default useTokenAllowance