import client from "@/helpers/apollo";
import { gql } from "@apollo/client";
import { DocumentNode } from "graphql";

export default async function SSRCategoryOptions() {

    const GetProductsQuery: DocumentNode =
        gql`
                        query  {
                            info
                    {
                        subtypes
                    }
                }
            `
    const { data, networkStatus, error } = await client.query({
        query: GetProductsQuery,
    });

    return data.info.subtypes.map((subtype: string) => <CategoriesListItem subtype={subtype} />)
}

function CategoriesListItem({ subtype }: { subtype: string }) {
    return <h2 className={`my-3 text-gray-500 cursor-pointer text-xl relative`}>{"+"} {subtype}</h2>
}