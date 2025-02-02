import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import styles from "./nearbyjobs.style";
import useFetch from "../../../hook/useFetch";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";

const NearByJobs = () => {
  const router = useRouter();
  const { data, error, isLoading } = useFetch("search", {
    query: "react developer",
    page: "1",
    num_pages: "1",
    country: "us",
    date_posted: "all",
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            nestedScrollEnabled
            renderItem={({ item }) => (
              <NearbyJobCard
                job={item}
                key={`near-by-${item?.job_id}`}
                handleNavigate={() =>
                  router.push(`/job-details/${item?.job_id}`)
                }
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default NearByJobs;
