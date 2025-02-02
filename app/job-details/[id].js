import { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Stack, useRouter, useLocalSearchParams } from "expo-router";
import useFetch from "../../hook/useFetch";
import { COLORS, icons, SIZES } from "../../constants";
import { Company, JobAbout, JobTabs, ScreenHeaderBtn, Specifics } from "../../components";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const router = useRouter();
  const params = useLocalSearchParams();
  const { data, isLoading, error, reFetch } = useFetch("job-details", {
    job_id: params?.id,
  });

  console.log('DATA: ', data[0] === null ? 'Y' : 'N' );
  console.log('DATA: ', data);

  const onRefresh = () => {};

  const displayTabContent = () => {
    switch (activeTab) {
      case "Qualifications":
        return (
          <Specifics
            titlle="Qualifications"
            points={data[0]?.job_highlights?.qualifications ?? "N/A"}
          />
        );
      case "About":
        return <JobAbout info={data[0]?.job_description ?? 'N/A'}/>
      case "Responsibilities":
      default:
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimention="60%"
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimention="60%" />
          ),
          headerTitle: "",
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : error ? (
            <Text>Something wen wrong</Text>
          ) : data?.length === 0 ? (
            <Text>No data</Text>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0]?.employerLogo}
                jobTitle={data[0]?.job_title}
                companyName={data[0]?.employerName}
                location={data[0]?.job_country}
              />
              <JobTabs
                tabs={tabs}
                activeTabs={activeTab}
                setActiveTab={setActiveTab}
              >
                {displayTabContent()}
              </JobTabs>
            </View>
          )}
        </ScrollView>
      </Stack.Screen>
    </SafeAreaView>
  );
};

export default JobDetails;
