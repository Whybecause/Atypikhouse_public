import { useState } from "react";
import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";
import {
  Flex,
  Stack,
  Heading,
  Text,
  Spinner
} from "@chakra-ui/react";

import * as api from "../../../utils/helpers/api-helper";
import { useAppDispatch } from "../../../hooks/reduxHook";
import { createReservation } from "../../../slices/propertiesSlice";
import messageTemplate from "../../../template/messages-template.json";
import { addMessage } from "../../../slices/messagesSlice";
import { dateLang } from "../../../utils/helpers/dates-helper";

const ResultPage: NextPage = () => {
  const [shouldRedirect, setShouldRedirect] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Fetch CheckoutSession from static page via
  // https://nextjs.org/docs/basic-features/data-fetching#static-generation
  const { data, error } = useSWR(
    router.query.session_id
      ? `/checkout_sessions/${router.query.session_id}`
      : null,
    api.default.get
  );

  useEffect(() => {
    async function handleStateAndSendMsg() {

      if (data) {
        dispatch(createReservation(data.historical));

        const createdMsg = await dispatch(addMessage({
          id: data.historical.property.userId,
          content: `${messageTemplate.newReservation} : du ${dateLang(data.historical.dateStart, "DD MMM YYYY")} au ${dateLang(data.historical.dateEnd, "DD MMM YYYY")}`
        }));

        // disable for now coz bugs
        await api.default.post("/pusher", { ...createdMsg.payload.result, channel: `${data.historical.property.userId}` });

        setShouldRedirect(true);
      }
    }

    handleStateAndSendMsg();
  }, [data]);

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/dashboard/tenant");
    }
  }, [shouldRedirect]);

  return (
    <>
      {error && (
        <div style={{ textAlign: "center" }}>Echec lors de la réservation</div>
      )}
      {!error && (
        <Flex
          align={'center'}
          justify={'center'}
          py={12}
        >
          <Stack
            boxShadow={'2xl'}
            bg="green.200"
            color="brand.dark"
            rounded={'xl'}
            p={10}
            spacing={8}
            align={'center'}>
            <Stack align={'center'} spacing={2}>
              <Heading fontSize={'2xl'}>
                Votre réservation est validée !
              </Heading>
              <Text fontSize="md"> Redirection vers le tableau de bord...</Text>
              <Spinner size="md" />
            </Stack>
          </Stack>
        </Flex>
      )}
    </>
  )
};

export default ResultPage;
